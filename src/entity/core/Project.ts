import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany} from "typeorm";
import {Module} from "./Module";
import{ProjectPojo} from '../../pojo';


@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

    @OneToMany(type => Module, module => module.project)
    public modules?: Module[];

    public constructor(name: string, modules: Module[]) {
        this.name = name;
        this.modules = modules;
    }

public toPojo(): ProjectPojo{
return {id:this.id, name:this.name,modules:this.modules?this.modules.map(m=>m.toPojo()):[]};
}


public toString(): string {
return `<Project name=${this.name}/>`;
}
}
