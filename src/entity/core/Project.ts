import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany} from "typeorm";
import {Module} from "./Module";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany(type => Module, module => module.project)
    public modules: Module[];

    constructor(id: number, name: string, modules: Module[]) {
        this.id = id;
        this.name = name;
        this.modules = modules;
    }
}
