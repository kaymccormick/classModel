import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";

@Entity()
export class Import {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Module, module => module.imports)
    module: Module;

    @Column()
    public localName: string;

    @Column()
    public sourceModuleName: string;

    @Column()
    public exportedName: string;
    @Column()
    public isDefaultImport: boolean;
    @Column()
    public isNamespaceImport: boolean;

    public constructor(id: number, module: Module, localName: string, sourceModuleName: string, exportedName: string, isDefaultImport: boolean, isNamespaceImport: boolean) {
        this.id = id;
        this.module = module;
        this.localName = localName;
        this.sourceModuleName = sourceModuleName;
        this.exportedName = exportedName;
        this.isDefaultImport = isDefaultImport;
        this.isNamespaceImport = isNamespaceImport;
    }
}
