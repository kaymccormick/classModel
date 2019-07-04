import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {List} from "immutable";
import {Method} from "./Method";
import { Type } from './Type';

@Entity()
export class Parameter {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

    @Column()
    public ordinal?: number;

    @ManyToOne(type => Method, method => method.parameters)
    public method?: Method;

    @ManyToOne(type => Type)
    @JoinColumn()
    public type?: Type;

    constructor(name: string, method: Method) {
        this.name = name;
        this.method = method;
    }
}
