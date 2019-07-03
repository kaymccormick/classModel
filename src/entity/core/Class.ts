import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany,ManyToMany,JoinTable} from "typeorm";
import {Module} from './Module';
import {Method} from "./Method";
import {Interface} from './Interface';

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    public id: number;

    @ManyToOne(type => Module, module => module.classes)
    public module: Module;

    @ManyToOne(type => Class, class_ => class_.subClasses, { nullable: true })
    public superClass?: Class;

    @OneToMany(type => Class, class_ => class_.superClass)
    public subClasses?: Class[];

    @ManyToMany(type => Interface)
    @JoinTable()
    public implements?: Interface[]

    @Column()
    public name: string;

    @OneToMany(type => Method, method => method.classProperty)
    public methods: Method[];

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode: any;

    @Column({name: "superclassnode", type: "jsonb", nullable: true})
    public superClassNode: any;

    public constructor(module: Module, name: string, methods: Method[], subclasses: Class[]) {
        this.module = module;
        this.name = name;
        this.methods = methods;
	this.subClasses = subclasses;
    }
}
