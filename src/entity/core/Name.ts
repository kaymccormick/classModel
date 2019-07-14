/**
 * @uuid b3e58bf9-e0f0-4418-a858-1c8196edbbfc
 */
import { Column, Entity, ManyToOne } from "typeorm";
import {Module} from "./Module";
import {NamePojo} from '../../pojo';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";

/*
 * @uuid 292c55e2-8317-43be-b793-da6afefc0fa8
*/
@Entity()
export class Name extends Base implements PojoBuilder<NamePojo> {
    @Column()
    public moduleId?: number;

    @ManyToOne(type => Module, module => module.names)
    public module?: Module;

    @Column({name: 'namekind', nullable:true})
    public nameKind?: string;

    @Column({type: 'jsonb', name: 'astnode', nullable: true})
    public astNode: any;


    public toPojo(args?: PojoBuildArguments): NamePojo {
        return { id: this.id ,
            moduleId: this.moduleId,
            module: this.module ? this.module.toPojo(args) : undefined,
            name: this.name,
            nameKind: this.nameKind,
            astNode: this.astNode,
        }
    }

    public toString(): string {
        return `<Name module=${this.module} name=${this.name}/>`;

    }
}
