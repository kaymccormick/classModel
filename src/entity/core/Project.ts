/**
 * @uuid 2636ec1f-9359-4053-b165-c3c5841aa18c
 */
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from "typeorm";
import {Module} from "./Module";
import{ProjectPojo} from '../../pojo';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";


/*
 * @uuid bd34fcfc-8486-42da-a45e-4b1b0ea6ea5f
*/
@Entity()
export class Project extends Base implements PojoBuilder<ProjectPojo> {
    @Column()
    public path?: string;

    @OneToMany(type => Module, module => module.project)
    public modules?: Module[];

    @Column({type: "jsonb", name: "packagejson", nullable: true})
    public packageJson?: any;

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
            packageJson:this.packageJson,
        };
    }


    public toString(): string {
        return `<Project name=${this.name}/>`;
    }
}
