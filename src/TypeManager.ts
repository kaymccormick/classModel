/**
 * @uuid 71afb234-dd3e-4eab-9003-38999ba5b72a
 */
import { Connection, Repository } from 'typeorm';
import EntityCore from './entityCore';
import { copyTree } from './utils';
import { namedTypes } from 'ast-types';
import{ CreateTypeManagerArgs } from './args';
import{ FactoryInterface } from './types';
import winston,{Logger} from 'winston';

/*
 * @uuid 08b90abf-18ce-4489-9fcc-7dcff848e3f8
*/
export class TypeManager {
// @ts-ignore
    private connection: Connection;
    private createdBy?: string;
    private tsTypeRepository: Repository<EntityCore.TSType>;
    private logger: winston.Logger;
    private factory: FactoryInterface;

    public constructor(args: CreateTypeManagerArgs) {
        if(args.connection === undefined) {
            throw new Error('need connection');
        }
        this.connection = args.connection;

        
        this.createdBy = args.createdBy;
        if(!args.logger) {
            throw new Error('need logger');
        }
        this.logger = args.logger;
        if(!args.factory) {
            throw new Error('need factory');
        }
        this.factory = args.factory;
        this.tsTypeRepository = this.connection.getRepository(EntityCore.TSType);
    }

    public findType(moduleId: number, astNode: any): Promise<EntityCore.TSType|undefined> {
        return this.tsTypeRepository.find({moduleId, astNode}).then(types => {
            if(types.length > 1) {
                throw new Error('too many types matchingm');
            } else if(types.length === 0) {
                this.logger.debug('cant find type');
                return undefined;
            }
            this.logger.debug('found type');
            return types[0];
        });
    }

    public createType(moduleId: number, astNode?: any|undefined, origin?: string): Promise<EntityCore.TSType> {
        const tsType = this.factory.createTSType();
        tsType.moduleId = moduleId;
        tsType.astNode = astNode;
        tsType.tsNodeType = astNode.type;
        tsType.origin = origin;
        //@ts-ignore
        tsType.createdBy = this.createdBy;
        return this.findType(moduleId, astNode).then(type => {
            if(type) {
                throw new Error('existing type');
            }
        }).then(() =>
            this.tsTypeRepository.save(tsType).then(tsType1 => {
                if (astNode.type === 'TSTypeReference') {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const ref = new EntityCore.TSTypeReference(tsType1.id!);
                    const nameRepo = this.connection.getRepository(EntityCore.Name);
                    if(astNode.typeName.type === 'Identifier' || astNode.typeName.type === 'TSQualifiedName') {
                        throw new Error(`unrecognized node type ${astNode.typeName.type}`);
                    }
                    if(astNode.typeName.type === 'TSQualifiedName') {
                        this.logger.warn(astNode);
                        throw new Error('cannot yet handle TSQualifiedName');
                    }
                    const name = astNode.typeName.name;
                    return nameRepo.find({
                        moduleId,
                        name,
                    }).then(names => {
                        if (names.length === 0) {
                            this.logger.debug('found no names');
                            const name_ = new EntityCore.Name();
                            name_.name = name;
                            name_.moduleId = moduleId;
                            return nameRepo.save(name_);
                        } else {
                            return names[0];
                        }
                    }).then(name__ => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const ref = new EntityCore.TSTypeReference(tsType1.id!);
                        this.logger.debug(`creating ts type reference with id ${tsType1.id!}`);
                        ref.typeName = name__;
                        return this.connection.manager.save(ref).catch((error: Error): void =>{
                            this.logger.debug(`unable to save ts type reference: ${error.message}`);
                        }).then(() => tsType1);
                    });

                } else if (astNode.type === 'TSUnionType') {
                    return this.handleTSUnionType(tsType1, astNode, this.tsTypeRepository);
                }
                return tsType1;
            }).catch((error: Error): void =>{
                throw new Error(`unable to save tstype:${error.message}`);
            }));
    }

    private handleTSUnionType(type: EntityCore.TSType,
        t1: namedTypes.TSUnionType,
        tsTypeRepo: Repository<EntityCore.TSType>,
    ): Promise<any> {
        this.logger.debug('union type');
        if (!type.id) {
            throw new Error('need id');
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const union = new EntityCore.TSUnionType(type.id!);
        return (t1.types.map((unionNode: namedTypes.TSType) => {
            return () => this.tsTypeRepository.find({
                where: {
                    astNode: copyTree(unionNode).toJS(),
                    moduleId: type.moduleId,
                }
            }).then(ts => {
                this.logger.debug(`got ${ts.length} types`);
                if (ts.length === 0) {
                    return this.createType(type.moduleId!, copyTree(unionNode).toJS(), 'union');
                    /*
                    const newType = this.factory.createTSType();
                    newType.tsNodeType = unionNode.type;
                    newType.astNode = ;
                    newType.moduleId = type.moduleId;
                    newType.createdBy = this.createdBy;
                    return tsTypeRepo.save(newType);*/
                } else {
                    return ts[0];
                }
            });
            // @ts-ignore
        })).reduce((a, v) => a.then(r => v().then(cr => [...r, cr])), Promise.resolve([])).then(results => {
            this.logger.debug('saving union type');
            this.logger.debug(results);
            union.types = results;

            this.logger.debug(union);
            return this.connection.getRepository(EntityCore.TSUnionType).save(union).then(() => type).catch((error: Error): void => {
                this.logger.debug('unable to save union type ' + error.message);
            });
        });//.reduce((a: Promise<void>, v: () => Promise<void>): Promise<void> => a.then(() => v()), Promise.resolve(undefined));
    }

}
