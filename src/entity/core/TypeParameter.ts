import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinColumn} from "typeorm";
import {List} from "immutable";
import { Type } from './Type';
import { Base } from './Base';

@Entity()
export class TypeParameter extends Base {
    @Column()
    public ordinal?: number;

    @ManyToOne(type => Type)
    @JoinColumn()
    public type?: Type;

    constructor(name: string) {
        super();
        this.name = name;
    }
}
