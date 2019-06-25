import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {List} from "immutable";
import {Method} from "./Method";

@Entity()
export class Parameter {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne(type => Method, method => method.parameters)
    public method: Method;

    constructor(id: number, name: string, method: Method) {
        this.id = id;
        this.name = name;
        this.method = method;
    }
}
