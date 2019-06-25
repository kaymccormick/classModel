import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {List} from "immutable";
import {Parameter} from "./Parameter";
import {Class} from "./Class";

@Entity()
export class Method {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany(type => Parameter, parameter => parameter.method)
    public parameters: List<Parameter>;

    @ManyToOne(type => Class, class_ => class_.methods)
    public classProperty: Class;


    constructor(id: number, name: string, parameters: List<Parameter>, classProperty: Class) {
        this.id = id;
        this.name = name;
        this.parameters = parameters;
        this.classProperty = classProperty;
    }
}
