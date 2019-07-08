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
import {ModulePojo} from '../../pojo';


@Entity({name: "modules"})
export class Module {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

@Column()
    public projectId?: number;

    @ManyToOne(type => Project, project => project.modules)
public project?: Project;

    @OneToMany(type => Class, class_ => class_.module)
    public classes?: Class[];

    @OneToOne(type => Export)
    @JoinColumn()
    public defaultExport?: Export;

    @OneToMany(type => Export, export_ => export_.module)
    public exports?: Export[];

    @OneToMany(type => Import, import_ => import_.module)
    public imports?: Import[];

    @OneToMany(type => Name, name => name.module)
    public names?: Name[];

    @OneToMany(type => TSType, type => type.module)
    public types?: TSType[];

    public constructor(moduleName: string, project: Project, classes: Class[],
        exports: Export[], imports: Import[],names: Name[],types: TSType[]) {
        this.name = moduleName;
        this.project = project;
        this.classes = classes;
        this.exports = exports;
        this.imports= imports;
        this.names = names;
        this.types = types;
    }

    public toPojo(): ModulePojo {
        return { id: this.id,
            name:this.name,
            projectId:this.projectId,
            classes:this.classes?this.classes.map(c=>c.toPojo()):undefined,
            exports:this.exports?this.exports.map(e=>e.toPojo()):undefined,
            imports:this.imports?this.imports.map(i=>i.toPojo()):undefined,
            names:this.names?this.names.map(n=>n.toPojo()):undefined,
            types:this.types?this.types.map(t=>t.toPojo()):undefined,
        }
    }

    public toString(): string {
        return `<Module name=${this.name} project=${this.project || this.projectId}/>`;
    }
}
