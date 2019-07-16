import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    JoinTable,
    JoinColumn,
    OneToOne,
    ManyToMany,
} from "typeorm";
import {List} from "immutable";
import { Name } from './Name';
import { TSType } from './TSType';
import { Module } from './Module';
import { TypeBase } from './TypeBase';

@Entity()
export class TSConditionalType extends TypeBase {
    /*    @OneToOne(type => Name, { nullable: true })
    @JoinColumn()
    public typeName?: Name;*/

    @ManyToOne(type => TSType)
    @JoinColumn()
    public checkType?: TSType;

    @ManyToOne(type => TSType)
    @JoinColumn()
    public extendsType?: TSType;

    @ManyToOne(type => TSType)
    @JoinColumn()
    public trueType?: TSType;

    @ManyToOne(type => TSType)
    @JoinColumn()
    public falseType?: TSType;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

    constructor(id: number) {
        super();
        this.id = id;
    }
}
