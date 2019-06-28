import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";

@Entity()
export class Export {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public localName: string;

    @Column()
    public name: string;

    @ManyToOne(type => Module, module => module.exports)
    module: Module;

   public constructor(localName: string, name: string, module: Module) {
     this.localName = localName;
     this.name = name;
     this.module = module;
  }
}
