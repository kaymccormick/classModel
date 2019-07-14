/**
 * @uuid 137d2618-0334-4152-babe-46ef5ffb0f35
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    JoinTable,
    OneToOne,
    ManyToMany,
} from "typeorm";
import {List} from "immutable";
import { Name } from './Name';
import { TSType } from './TSType';
import { Module } from './Module';
import { Base } from './Base';

/*
 * @uuid aa356ecd-652c-448c-9834-4666a8468dc0
*/
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
