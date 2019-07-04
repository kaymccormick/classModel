import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinColumn,OneToOne} from "typeorm";
import {List} from "immutable";
import { TypeEnum } from './TypeEnum';
import { Name } from './Name';

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

    @OneToOne(type => Name)
    @JoinColumn()
    public typeName?: Name;

    @Column({name: 'basetype', nullable: true})
    public baseType?: TypeEnum;

    constructor() {
    }
}
