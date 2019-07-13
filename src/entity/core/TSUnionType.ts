import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinTable,OneToOne,ManyToMany} from "typeorm";
import {List} from "immutable";
import { Name } from './Name';
import { TSType } from './TSType';
import { Module } from './Module';
import { Base } from './Base';

@Entity()
export class TSUnionType extends Base {
    /*    @OneToOne(type => Name, { nullable: true })
    @JoinColumn()
    public typeName?: Name;*/

    @ManyToMany(type => TSType, { cascade: false })
    @JoinTable()
    public types?: TSType[];

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

    constructor(id: number) {
        super();
        this.id = id;
    }
}
