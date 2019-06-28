import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Project} from "./Project";
import {Class} from "./Class";
import {Export} from "./Export";
import {Import} from "./Import";


@Entity({name: "modules"})
export class Module {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    public id: number;

    @Column()
    public name: string;

    @ManyToOne(type => Project, project => project.modules)
    project: Project;

    @OneToMany(type => Class, class_ => class_.module)
    public classes: Class[];

    @OneToMany(type => Export, export_ => export_.module)
    public exports: Export[];

    @OneToMany(type => Import, import_ => import_.module)
    public imports: Import[];

    public constructor(moduleName: string, project: Project, classes: Class[],
                exports: Export[], imports: Import[]) {
        this.name = moduleName;
        this.project = project;
	this.classes = classes;
this.exports = exports;
this.imports= imports;
    }

public toString(): string {
return `<Module name=${this.name} project=${this.project.name}/>`;
}
}
