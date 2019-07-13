import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany} from "typeorm";
import {Module} from "./Module";
import{ProjectPojo} from '../../pojo';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";


@Entity()
export class Project extends Base implements PojoBuilder<ProjectPojo> {
    @Column()
    public path?: string;

    @OneToMany(type => Module, module => module.project)
    public modules?: Module[];

    public constructor(name: string, path?: string, modules?: Module[]) {
        super();
        this.name = name;
        this.path = path;
        this.modules = modules;
    }

    public toPojo(args?: PojoBuildArguments ): ProjectPojo{
        return { id:this.id,
        name:this.name,
        modules:this.modules?this.modules.map(m=>m.toPojo()):[],
        path: this.path,
        };
    }


    public toString(): string {
        return `<Project name=${this.name}/>`;
    }
}
