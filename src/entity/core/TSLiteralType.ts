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
export class TSLiteralType extends TypeBase {
    @OneToOne(type => TSType)
    @JoinColumn({name: 'basetstypeid'})
    public tsType?: TSType;

}
