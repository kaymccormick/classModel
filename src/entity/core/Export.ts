/**
 * @uuid d1f6575f-2d54-4fac-8ea4-6e5340aaec21
 */
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";
import {ExportPojo} from '../../pojo';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";

/*
 * @uuid 86d3f1ba-06e9-41af-840e-00a4d1839fc9
*/
@Entity()
export class Export extends Base implements PojoBuilder<ExportPojo> {
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

