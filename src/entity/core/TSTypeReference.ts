import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinTable,OneToOne,ManyToMany,JoinColumn} from "typeorm";
import {List} from "immutable";
import { Name } from './Name';
import { TSType } from './TSType';
import { Module } from './Module';

@Entity()
export class TSTypeReference {
    @PrimaryColumn()
    public id?: number;

    @OneToOne(type => Name)
    @JoinColumn()
    public typeName?: Name;

    constructor(id: number) {
    this.id = id;
    }
}
