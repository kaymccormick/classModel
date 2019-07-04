import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinColumn} from "typeorm";
import {List} from "immutable";
import { Type } from './Type';

@Entity()
export class TypeParameter {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name: string;

    @Column()
    public ordinal?: number;

    @ManyToOne(type => Type)
    @JoinColumn()
    public type?: Type;

    constructor(name: string) {
        this.name = name;
    }
}
