import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";
import {ExportPojo} from '../../pojo';
import { Base } from './Base';

@Entity()
export class Export extends Base {
    @Column({nullable: true})
    public name?: string;

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

    public toPojo(): ExportPojo {
        return {
            id:this.id,
            name:this.name,
            exportedName:this.exportedName,
            module:this.module,
            isDefaultExport:this.isDefaultExport,
        }
    }
}

