import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn
} from "typeorm";
import {Project} from "./Project";
import {TSType} from "./TSType";
import {Class} from "./Class";
import {Export} from "./Export";
import {Import} from "./Import";
import {Name} from "./Name";


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

    @OneToOne(type => Export)
    @JoinColumn()
    defaultExport?: Export;

    @OneToMany(type => Export, export_ => export_.module)
    public exports: Export[];

    @OneToMany(type => Import, import_ => import_.module)
    public imports: Import[];

    @OneToMany(type => Name, name => name.module)
    public names: Name[];

    @OneToMany(type => TSType, type => type.module)
    public types?: TSType[];

    public constructor(moduleName: string, project: Project, classes: Class[],
                exports: Export[], imports: Import[],names:Name[]) {
        this.name = moduleName;
        this.project = project;
	this.classes = classes;
this.exports = exports;
this.imports= imports;
this.names = names;
    }

public toString(): string {
return `<Module name=${this.name} project=${this.project.name}/>`;
}
}
