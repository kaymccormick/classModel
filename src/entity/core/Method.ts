import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Parameter} from "./Parameter";
import {Class} from "./Class";

@Entity()
export class Method {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name: string;

    @OneToMany(type => Parameter, parameter => parameter.method)
    public parameters: Parameter[];

    @ManyToOne(type => Class, class_ => class_.methods)
    public classProperty: Class;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode: any;

@Column({nullable: true})
public accessibility?: string;

    public constructor(name: string, parameters: Parameter[], classProperty: Class) {
        this.name = name;
        this.parameters = parameters;
        this.classProperty = classProperty;
    }
}
