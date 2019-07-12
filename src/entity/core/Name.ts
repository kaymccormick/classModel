import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn
} from "typeorm";
import {Project} from "./Project";
import {Class} from "./Class";
import {Export} from "./Export";
import {Import} from "./Import";
import {Module} from "./Module";
import {NamePojo} from '../../pojo';
import { Base } from './Base';

@Entity()
export class Name extends Base {
    @Column()
    public moduleId?: number;

    @ManyToOne(type => Module, module => module.names)
    public module?: Module;

    @Column({name: 'namekind', nullable:true})
    public nameKind?: string;

    @Column({type: 'jsonb', name: 'astnode', nullable: true})
    public astNode: any;


    public toPojo(): NamePojo {
        return { id: this.id ,
            moduleId: this.moduleId,
            module: this.module ? this.module.toPojo() : undefined,
            name: this.name,
            nameKind: this.nameKind,
            astNode: this.astNode,
        }
    }

    public toString(): string {
        return `<Name module=${this.module} name=${this.name}/>`;

    }
}
