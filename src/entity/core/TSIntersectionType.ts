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
export class TSIntersectionType extends TypeBase {
@OneToOne(type => TSType)
@JoinColumn({name: 'basetstypeid'})
    public tsType?: TSType;
    /*    @OneToOne(type => Name, { nullable: true })
    @JoinColumn()
    public typeName?: Name;*/

    @ManyToMany(type => TSType, { cascade: false })
    @JoinTable()
public types?: TSType[];

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

}
