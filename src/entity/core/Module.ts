import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Project} from "./Project";
import {Class} from "./Class";
import {List} from 'immutable';
import {Export} from "./Export";
import {Import} from "./Import";

@Entity()
export class Module {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    public id: number;

    @Column()
    public name: string;

    @ManyToOne(type => Project, project => project.modules)
    project: Project;

    @OneToMany(type => Class, class_ => class_.module)
    public classes: List<Class>;

    @OneToMany(type => Export, export_ => export_.module)
    public exports: List<Export>;

    @OneToMany(type => Import, import_ => import_.module)
    public imports: List<Import>;

    constructor(/*moduleId: number, */moduleName: string, project: Project, classes: List<Class>,
                exports: List<Export>, imports: List<Import>) {
        //this.id = moduleId;
        this.name = moduleName;
        this.project = project;
	this.classes = classes;
this.exports = exports;
this.imports= imports;
    }
}



