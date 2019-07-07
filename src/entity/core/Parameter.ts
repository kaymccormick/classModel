import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinColumn} from "typeorm";
import {List} from "immutable";
import {Method} from "./Method";
import { TSType } from './TSType';
import {ParameterPojo}from '../../pojo';

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

@Column()
public typeId?: number;

@ManyToOne(type => TSType)
    @JoinColumn()
    public type?: TSType;

    constructor(name: string, method: Method) {
        this.name = name;
        this.method = method;
    }

public toPojo(): ParameterPojo {
return { id: this.id, name: this.name, ordinal: this.ordinal, method: this.method ? this.method.toPojo() : undefined };
}

    public toString():string {
    return `<Parameter method=${this.method}; name=${this.name}; type=${this.type || this.typeId}/>`;
    }
}
