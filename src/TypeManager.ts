/**
 * @uuid 71afb234-dd3e-4eab-9003-38999ba5b72a
 */
import { Connection, Repository } from 'typeorm';
import EntityCore from './entityCore';
import { copyTree } from './utils';
import { namedTypes } from 'ast-types';
import{ CreateManagerArgs } from './args';
import{ FactoryInterface } from './types';
import winston,{Logger} from 'winston';
import { print } from 'recast';
import { PromiseResult, PromiseResultImpl, myReduce } from '@heptet/common';

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

    public constructor(args: CreateManagerArgs) {
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

    public findType(moduleId: number, astNode: namedTypes.Node): Promise<PromiseResult<EntityCore.TSType>> {

        return this.tsTypeRepository.find({moduleId, astNode: copyTree(astNode).toJS() as any}).then((types: EntityCore.TSType[]): Promise<PromiseResult<EntityCore.TSType>> => {
            if(types.length > 1) {
                // this error is often obscured
                throw new Error('too many types matching');
            } else if(types.length === 0) {
                return PromiseResultImpl.successNoResultPromise('');
            }
            this.logger.debug(`found type, looking for specific type instance ${types[0].tsNodeType}`);
            try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return this.connection.getRepository(types[0].tsNodeType!).find({tsTypeId: types[0].id}).then((types2_): Promise<PromiseResult<EntityCore.TSType>> => {
                    // @ts-ignore
                    if(types2_.length) {
                        return PromiseResultImpl.successResultPromise('', types[0]);

                    } else {
                        return this.buildType(moduleId, types[0], types[0].astNode);
                    }
                                    
                });
            } catch(error) {
                if(!/^No repository/.test(error.message)) {
                    this.logger.error(error.message);
                    /* Not sure what to do here. */
                }
            }
            
            return PromiseResultImpl.successResultPromise('', types[0]);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public buildType(moduleId: number, tsType1: EntityCore.TSType, astNode: any|undefined): Promise<PromiseResult<any>> {
        if (astNode.type === 'TSTypeReference') {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const ref = new EntityCore.TSTypeReference();
            ref.tsType = tsType1;
            const nameRepo = this.connection.getRepository(EntityCore.Name);
/*            if(astNode.typeName.type === 'Identifier' || astNode.typeName.type === 'TSQualifiedName') {
                throw new Error(`unrecognized node type ${astNode.typeName.type}`);
            }*/
            if(astNode.typeName.type === 'TSQualifiedName') {
                this.logger.warn(astNode);
                throw new Error('cannot yet handle TSQualifiedName');
            }
            const name = astNode.typeName.name;
            return nameRepo.find({
                moduleId,
                name,
            }).then((names): Promise<PromiseResult<EntityCore.Name>> => {
                if (names.length === 0) {
                    this.logger.debug('found no names');
                    const name_ = new EntityCore.Name();
                    name_.name = name;
                    name_.moduleId = moduleId;
                    return nameRepo.save(name_).then((name__): Promise<PromiseResult<EntityCore.Name>> => PromiseResultImpl.successResultPromise('', name__));
                } else {
                    return PromiseResultImpl.successResultPromise('', names[0]);
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }).then((nameResult): Promise<PromiseResult<any>> => {
                const ref = new EntityCore.TSTypeReference();
                ref.tsType = tsType1;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.logger.debug(`creating ts type reference with id ${tsType1.id!}`);
                ref.typeName = nameResult.result;
                return this.connection.manager.save(ref).then((): Promise<PromiseResult<EntityCore.TSType>> => PromiseResultImpl.successResultPromise('', tsType1));
            });
        } else if (astNode.type === 'TSUnionType') {
            return this.handleTSUnionType(tsType1, astNode, this.tsTypeRepository);
        } else if (astNode.type === 'TSIntersectionType') {
            this.logger.debug('handling ts intersection type');
            return this.handleTSIntersectionType(tsType1, astNode, this.tsTypeRepository);
        } else if(astNode.type === 'TSLiteralType') {
//            return this.handleTSLiteralType(tsType1, astNode, this.tsTypeRepository);
        }
                
        return PromiseResultImpl.successResultPromise('', tsType1);
    }

    public createType(moduleId: number, astNode?: namedTypes.Node, origin?: string): Promise<PromiseResult<EntityCore.TSType>> {
        const tsType = this.factory.createTSType();
        tsType.moduleId = moduleId;
        tsType.astNode = astNode;
        tsType.code = print(astNode!).code;
        
        tsType.tsNodeType = astNode!.type;
        tsType.origin = origin;
        //@ts-ignore
        tsType.createdBy = this.createdBy;
        return this.findType(moduleId, astNode!).then((typeResult): Promise<PromiseResult<void>>  => {
            if(typeResult.hasResult) {
                return PromiseResultImpl.failurePromise('', new Error('existing type'));
            } else {
                return PromiseResultImpl.successNoResultPromise('');
            }
        }).then((findResult: PromiseResult<void>): Promise<PromiseResult<EntityCore.TSType>> => {
            if(findResult.success) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return this.tsTypeRepository.save(tsType).then((tsType1): Promise<PromiseResult<EntityCore.TSType>> => {
                    return this.buildType(moduleId, tsType1, astNode);
                });
            }
            return PromiseResultImpl.fromResultPromise(findResult);
        });
    }

    /*    private handleTSLiteralType(type: EntityCore.TSType,
        t1: namedTypes.TSLiteralType,
        tsTypeRepo: Repository<EntityCore.TSType>,
    ): Promise<any> {
        const detail = new EntityCore.TSLiteralType();
        detail.tsType = type;
        return Promise.resolve(undefined);
    }
    
  */  private handleTSIntersectionType(type: EntityCore.TSType,
        t1: namedTypes.TSIntersectionType,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tsTypeRepo: Repository<EntityCore.TSType>,
    ): Promise<PromiseResult<EntityCore.TSType>> {
        this.logger.debug('handleTSIntersectionType');
        const i = new EntityCore.TSIntersectionType();
        i.tsType = type;
        return myReduce(this.logger, t1.types, PromiseResultImpl.successResult('', []), (unionNode: namedTypes.TSType): Promise<PromiseResult<EntityCore.TSType>> => {
            return this.tsTypeRepository.find({
                where: {
                    astNode: copyTree(unionNode).toJS(),
                    moduleId: type.moduleId,
                }
            }).then((ts): Promise<PromiseResult<EntityCore.TSType>> => {
                this.logger.debug(`got ${ts.length} types`);
                if (ts.length === 0) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return this.createType(type.moduleId!, unionNode, 'intersection');
                } else {
                    return PromiseResultImpl.successResultPromise('', ts[0]);
                }
            });
        }).then((results): Promise<PromiseResult<EntityCore.TSType>> => {
            if(results.hasResult) {
                this.logger.debug('saving intersection type');
                this.logger.debug(results);
                i.types = results.result;

                return this.connection.getRepository(EntityCore.TSIntersectionType).save(i).then((): Promise<PromiseResult<EntityCore.TSType>> => PromiseResultImpl.successResultPromise('', type));
            }
            return PromiseResultImpl.fromResultPromise(results);
        });
    }

    private handleTSUnionType(type: EntityCore.TSType,
        t1: namedTypes.TSUnionType,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tsTypeRepo: Repository<EntityCore.TSType>,
    ): Promise<PromiseResult<EntityCore.TSType>> {
        this.logger.debug('union type');
        if (!type.id) {
            throw new Error('need id');
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const union = new EntityCore.TSUnionType();
        union.tsType = type;
        return myReduce(this.logger, t1.types, PromiseResultImpl.successResult('', []), (unionNode: namedTypes.TSType): Promise<PromiseResult<EntityCore.TSType>> => {
        
            return this.tsTypeRepository.find({
                where: {
                    astNode: copyTree(unionNode).toJS(),
                    moduleId: type.moduleId,
                }
            }).then((ts): Promise<PromiseResult<EntityCore.TSType>> => {
                this.logger.debug(`got ${ts.length} types`);
                if (ts.length === 0) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return this.createType(type.moduleId!, unionNode, 'union');
                } else {
                    return PromiseResultImpl.successResultPromise('', ts[0]);
                }
            });
        }).then((results): Promise<PromiseResult<EntityCore.TSType>> => {
            if(results.hasResult) {
                this.logger.debug('saving union type');
                this.logger.debug(results);
                union.types = results.result;
                this.logger.debug(union);
                return this.connection.getRepository(EntityCore.TSUnionType).save(union).then((): Promise<PromiseResult<EntityCore.TSType>> => PromiseResultImpl.successResultPromise('', type));
            }
            return PromiseResultImpl.fromResultPromise(results);
        });
    }

}
