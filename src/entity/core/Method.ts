import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Parameter} from "./Parameter";
import {Class} from "./Class";
import {MethodPojo} from '../../pojo';
import { Base } from './Base';

@Entity()
export class Method extends Base {
    @OneToMany(type => Parameter, parameter => parameter.method)
    public parameters?: Parameter[];

    @ManyToOne(type => Class, class_ => class_.methods)
    public classProperty?: Class;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

@Column({nullable: true})
    public accessibility?: string;

public constructor(name?: string, parameters?: Parameter[], classProperty?: Class) {
    super();
    this.name = name;
    this.parameters = parameters;
    this.classProperty = classProperty;
}

public toPojo(): MethodPojo {
    return {id:this.id, name: this.name, parameters: this.parameters ? this.parameters.map(p=>p.toPojo()) : [],classProperty: this.classProperty ? this.classProperty.toPojo() : undefined,astNode: this.astNode, accessibility: this.accessibility};
}

public toString(): string {
    return `<Method class=${this.classProperty} name=${this.name}/>`;
}
}
