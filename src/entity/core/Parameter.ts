import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import {List} from "immutable";
import {Method} from "./Method";
import {TSType} from './TSType';
import {ParameterPojo} from '../../pojo';
import {Base} from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";

@Entity()
export class Parameter extends Base implements PojoBuilder<ParameterPojo> {
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
        super();
        this.name = name;
        this.method = method;
    }

    public toPojo(args?: PojoBuildArguments): ParameterPojo {
        return {
            id: this.id,
            name: this.name,
            ordinal: this.ordinal,
            method: this.method ? this.method.toPojo() : undefined
        };
    }

    public toString(): string {
        return `<Parameter method=${this.method}; name=${this.name}; type=${this.type || this.typeId}/>`;
    }
}
