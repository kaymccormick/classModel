import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {List} from "immutable";
import { TypeEnum } from './TypeEnum';

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

    @OneToOne(type => Name)
    @JoinColumn()
    public name?: Name;

    @Column({name: 'basetype', nullable: true})
    public baseType?: TypeEnum;

    constructor() {
    }
}
