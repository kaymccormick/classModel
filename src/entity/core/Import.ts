import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";
import { ImportPojo } from '../../pojo';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";

@Entity()
export class Import extends Base implements PojoBuilder<ImportPojo> {
@Column()
    moduleId?: number;

    @ManyToOne(type => Module, module => module.imports)
module?: Module;

    @Column({name: "sourcemodulename"})
    public sourceModuleName?: string;

    @Column({ nullable: true })
    public exportedName?: string;
    @Column()
    public isDefaultImport?: boolean;
    @Column()
    public isNamespaceImport?: boolean;

    public constructor(module: Module,  name: string, sourceModuleName: string, exportedName?: string, isDefaultImport: boolean = false, isNamespaceImport: boolean = false) {
        super();
        this.module = module;
        this.name = name;
        this.sourceModuleName = sourceModuleName;
        this.exportedName = exportedName;
        this.isDefaultImport = isDefaultImport;
        this.isNamespaceImport = isNamespaceImport;
    }

    public toPojo(args?: PojoBuildArguments): ImportPojo {
        return {
            id: this.id,
            uuid:this.uuid,
            module: this.module ? this.module.toPojo() : undefined,
            moduleId: this.moduleId,
            name:this.name,
            sourceModuleName:this.sourceModuleName,
            exportedName:this.exportedName,
            isDefaultImport:this.isDefaultImport,
            isNamespaceImport:this.isNamespaceImport,
        }
    }

    public toString(): string {
        return `<Import ${this.module && this.module.name} ${this.name}/>`;
    }
}
