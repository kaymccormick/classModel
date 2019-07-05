import {Connection, Repository} from 'typeorm';
import {EntityCore} from './';

export class TypeManager {
private tsTypeRepository: Repository<EntityCore.TSType>;
public constructor(private connection: Connection) {
this.tsTypeRepository = connection.getRepository(EntityCore.TSType);
}

public findType(moduleId: number, astNode:any): Promise<EntityCore.TSType|undefined> {
return this.tsTypeRepository.find({moduleId, astNode}).then(types => {
console.log(types.length);
if(types.length === 0) {
return undefined;
}
return types[0];
});
}

public createType(moduleId: number, astNode?: any): Promise<EntityCore.TSType> {
  const tsType = new EntityCore.TSType();
  tsType.moduleId = moduleId;
  tsType.astNode = astNode;
  tsType.tsNodeType = astNode.type;
  return this.tsTypeRepository.save(tsType).then(tsType1 => {
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
                                ref.typeName = name__;
                                return this.connection.manager.save(ref);
                            });

                        } else if (astNode.type === 'TSUnionType') {
                            return this.handleTSUnionType(tsType1, astNode, this.tsTypeRepository, args);
                        }
                        });
                        }

    private static handleTSUnionType(type: EntityCore.TSType,
        t1: namedTypes.TSUnionType,
        tsTypeRepo: Repository<EntityCore.TSType>,
        iface: EntityCore.Interface,
        args: Args): Promise<any> {
        console.log('union type');
        if (!type.id) {
            throw new Error('need id');
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const union = new EntityCore.TSUnionType(type.id!);
        return (t1.types.map((unionNode: namedTypes.TSType) => {
            return () => tsTypeRepo.find({
                where: {
                    astNode: copyTree(unionNode).toJS(),
                    module: iface.module
                }
            }).then(ts => {
                console.log(`got ${ts.length} types`);
                if (ts.length === 0) {
                    const newType = new EntityCore.TSType();
                    newType.tsNodeType = unionNode.type;
                    newType.astNode = copyTree(unionNode).toJS();
                    newType.module = iface.module;
                    return tsTypeRepo.save(newType);
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
            return args.connection.getRepository(EntityCore.TSUnionType).save(union).then(union_ => {
                console.log(union_);
            }).catch((error: Error): void => {
                console.log('unable to save union type ' + error.message);
            });
        });//.reduce((a: Promise<void>, v: () => Promise<void>): Promise<void> => a.then(() => v()), Promise.resolve(undefined));
    }

}
