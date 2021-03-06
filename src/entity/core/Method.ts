/**
 * @uuid 3ff8ad83-3d9a-4a36-994f-0e25eb63604a
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import {Parameter} from "./Parameter";
import {Class} from "./Class";
import {MethodPojo} from '../../pojo';
import {Base} from './Base';
import {PojoBuildArguments} from "../../types";

/*
 * @uuid 8f7268fe-826f-48f8-b028-dd0086b4f12f
*/
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

    public toPojo(args?: PojoBuildArguments): MethodPojo {
        return {
            id: this.id,
            name: this.name,
            parameters: this.parameters ? this.parameters.map(p => p.toPojo(args)) : [],
            classProperty: this.classProperty ? this.classProperty.toPojo(args) : undefined,
            astNode: this.astNode,
            accessibility: this.accessibility
        };
    }

    public toString(): string {
        return `<Method class=${this.classProperty} name=${this.name}/>`;
    }
}
