/**
 * @uuid 83fba9b5-a4fa-4be4-91ba-1c8f710b30ad
 */
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";
import { ImportPojo } from '../../pojo';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";

/*
 * @uuid 9289b228-3251-47a5-813d-6a002f57d0b2
*/
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
