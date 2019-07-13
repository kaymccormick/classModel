import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";
import {ExportPojo} from '../../pojo';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";

@Entity()
export class Export extends Base implements PojoBuilder<ExportPojo>{
    @Column({name: "exportedname", nullable: true})
    public exportedName?: string;

    @ManyToOne(type => Module, module => module.exports)
    module: Module;

    @Column({name: "isdefaultexport"})
    isDefaultExport: boolean = false;

    public constructor(localName: string | undefined, exportedName: string | undefined, module: Module) {
        super();
        this.name = localName;
        this.exportedName = exportedName;
        this.module = module;
    }

    public toPojo(args?: PojoBuildArguments): ExportPojo {
        return {
            id:this.id,
            name:this.name,
            exportedName:this.exportedName,
            module:this.module ? this.module.toPojo(args): undefined,
            isDefaultExport:this.isDefaultExport,
        }
    }
}

