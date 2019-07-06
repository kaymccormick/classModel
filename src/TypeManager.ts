import {Connection, Repository} from 'typeorm';
import {EntityCore} from './';
import { copyTree } from './utils';
import { namedTypes } from 'ast-types';
import{ CreateTypeManagerArgs } from './args';
import winston from 'winston';

export class TypeManager {
private connection: Connection;
private createdBy: string;
private tsTypeRepository: Repository<EntityCore.TSType>;
private logger: winston.Logger;

public constructor(args: CreateTypeManagerArgs) {
this.connection = args.connection;
this.createdBy = args.createdBy;
this.logger = args.logger;
this.tsTypeRepository = this.connection.getRepository(EntityCore.TSType);
}

public findType(moduleId: number, astNode:any): Promise<EntityCore.TSType|undefined> {
return this.tsTypeRepository.find({moduleId, astNode}).then(types => {
if(types.length > 1) {
throw new Error('too many types matchingm');
} else if(types.length === 0) {
console.log('cant find type');
return undefined;
}
console.log('found type');
return types[0];
});
}

public createType(moduleId: number, astNode?: any|undefined, origin?: string): Promise<EntityCore.TSType> {
  const tsType = new EntityCore.TSType();
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
                            if(astNode.typeName.type !== 'Identifier') {
                                throw new Error(astNode.typeName.type);
                            }
                            const name = astNode.typeName.name;
                            return nameRepo.find({
                                moduleId,
                                name,
                            }).then(names => {
                                if (names.length === 0) {
                                console.log('found no names');
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
                                console.log(`creating ts type reference with id ${tsType1.id!}`);
                                ref.typeName = name__;
                                return this.connection.manager.save(ref).catch((error: Error): void =>{
                                console.log(`unable to save ts type reference: ${error.message}`);
                                }).then(() => tsType1);
                            });

                        } else if (astNode.type === 'TSUnionType') {
                            return this.handleTSUnionType(tsType1, astNode, this.tsTypeRepository);
                        }
                        return tsType1;
                        }).catch((error:Error):void =>{
  throw new Error(`unable to save tstype:${error.message}`);
  }));
                        }

    private handleTSUnionType(type: EntityCore.TSType,
        t1: namedTypes.TSUnionType,
        tsTypeRepo: Repository<EntityCore.TSType>,
        ): Promise<any> {
        console.log('union type');
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
                console.log(`got ${ts.length} types`);
                if (ts.length === 0) {
                return this.createType(type.moduleId!, copyTree(unionNode).toJS(), 'union');
/*                
                    const newType = new EntityCore.TSType();
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
            console.log('saving union type');
            console.log(results);
            union.types = results;

            console.log(union);
            return this.connection.getRepository(EntityCore.TSUnionType).save(union).then(() => type).catch((error: Error): void => {
                console.log('unable to save union type ' + error.message);
            });
        });//.reduce((a: Promise<void>, v: () => Promise<void>): Promise<void> => a.then(() => v()), Promise.resolve(undefined));
    }

}
