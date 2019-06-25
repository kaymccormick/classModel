import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Module} from './Module';
import {Method} from "./Method";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Module, module => module.classes)
    public module: Module;

    @Column()
    public name: string;

    @OneToMany(type => Method, method => method.classProperty)
    public methods: Method[];


    constructor(id: number, module: Module, name: string, methods: Method[]) {
        this.id = id;
        this.module = module;
        this.name = name;
        this.methods = methods;
    }
}
