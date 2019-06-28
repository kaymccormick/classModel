import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany} from "typeorm";
import {Module} from "./Module";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    public id: number;

    @Column()
    public name: string;

    @OneToMany(type => Module, module => module.project)
    public modules: Module[];

    public constructor(name: string, modules: Module[]) {
        this.name = name;
        this.modules = modules;
    }

public toString(): string {
return `<Project name=${this.name}/>`;
}
}
