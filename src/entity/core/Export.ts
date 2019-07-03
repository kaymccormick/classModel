import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";

@Entity()
export class Export {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({name:"localname", nullable: true})
    public localName?: string;

    @Column({name: "exportedname", nullable: true})
    public exportedName?: string;

    @ManyToOne(type => Module, module => module.exports)
    module: Module;

    @Column({name: "isdefaultexport"})
    isDefaultExport: boolean = false;

   public constructor(localName: string | undefined, exportedName: string | undefined, module: Module) {
     this.localName = localName;
     this.exportedName = exportedName;
     this.module = module;
  }
}
