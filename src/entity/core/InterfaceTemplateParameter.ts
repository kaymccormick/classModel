import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Method} from "./Method";
import {Type} from './Type';
import {Base} from './Base';
import {InterfaceTemplateParameterPojo, PojoBuilder} from "../../types";

@Entity()
export class InterfaceTemplateParameter extends Base {
    @Column()
    public ordinal?: number;

    @ManyToOne(type => Method, method => method.parameters)
    public method?: Method;

    @ManyToOne(type => Type)
    @JoinColumn()
    public type?: Type;

    constructor(name: string, method: Method) {
        super();
        this.name = name;
        this.method = method;
    }
}
