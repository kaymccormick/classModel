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

@Entity()
export class Name {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public moduleId?: number;

    @ManyToOne(type => Module, module => module.names)
    public module?: Module;

    @Column()
    public name?: string;

    @Column({name: 'namekind'})
    public nameKind?: string;

    @Column({type: 'jsonb', name: 'astnode', nullable: true})
    public astNode: any;

    public constructor() {
    }

public toString(): string {
return `<Name module=${this.module} name=${this.name}/>`;

}
}
