/**
 * @uuid 6715e107-e8d4-4a61-9911-2a6124af2c75
 */
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import {Method} from "./Method";
import {Type} from './Type';
import {Base} from './Base';
import {InterfaceTemplateParameterPojo, PojoBuilder} from "../../types";

/*
 * @uuid 45b8dfb2-4489-4b15-98ea-ddd0bd77ea60
*/
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
