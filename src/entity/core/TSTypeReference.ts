import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinTable,OneToOne,ManyToMany,JoinColumn} from "typeorm";
import {List} from "immutable";
import { Name } from './Name';
import { TSType } from './TSType';
import { Module } from './Module';
import { Base } from './Base';

@Entity()
export class TSTypeReference extends Base {
    @PrimaryColumn()
    public id?: number;

    @ManyToOne(type => Name)
    @JoinColumn()
    public typeName?: Name;

    constructor(id: number) {
    super();
        this.id = id;
    }
}
