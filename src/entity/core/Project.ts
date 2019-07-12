import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany} from "typeorm";
import {Module} from "./Module";
import{ProjectPojo} from '../../pojo';
import { Base } from './Base';


@Entity()
export class Project extends Base {
    @OneToMany(type => Module, module => module.project)
    public modules?: Module[];

    public constructor(name: string, modules: Module[]) {
    super();
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
