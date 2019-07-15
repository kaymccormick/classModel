/**
 * @uuid 61ee01e1-f8d2-4738-8460-cad8468f4413
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
    JoinColumn,
} from "typeorm";
import {List} from "immutable";
import { Name } from './Name';
import { TSType } from './TSType';
import { Module } from './Module';
import { TypeBase } from './TypeBase';

/*
 * @uuid ba8ad2da-cf51-4a2d-a0ee-c6c9c5b35a5a
*/
@Entity()
export class TSTypeReference extends TypeBase {
@OneToOne(type => TSType)
@JoinColumn({name: 'basetstypeid'})
    public tsType?: TSType;
    @ManyToOne(type => Name)
    @JoinColumn()
public typeName?: Name;

}
