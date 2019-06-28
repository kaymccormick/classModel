import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Module} from './Module';
import {Method} from "./Method";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    public id: number;

    @ManyToOne(type => Module, module => module.classes)
    public module: Module;

    @ManyToOne(type => Class, class_ => class_.subclasses, { nullable: true })
    public superclass?: Class;

    @OneToMany(type => Class, class_ => class_.superclass)
    public subclasses: Class[];

    @Column()
    public name: string;

    @OneToMany(type => Method, method => method.classProperty)
    public methods: Method[];

    public constructor(module: Module, name: string, methods: Method[], subclasses: Class[]) {
        this.module = module;
        this.name = name;
        this.methods = methods;
	this.subclasses = subclasses;
    }
}
