import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {Project} from "./Project";
import {Module} from "./Module";
import { ImportPojo } from '../../pojo';

@Entity({name: "imports"})
export class Import {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    public id: number;

    @ManyToOne(type => Module, module => module.imports)
    module: Module;

    @Column()
    public localName: string;

    @Column({name: "sourcemodulename"})
    public sourceModuleName: string;

    @Column({ nullable: true })
    public exportedName?: string;
    @Column()
    public isDefaultImport: boolean;
    @Column()
    public isNamespaceImport: boolean;

    public constructor(module: Module, localName: string, sourceModuleName: string, exportedName?: string, isDefaultImport: boolean = false, isNamespaceImport: boolean = false) {
        this.module = module;
        this.localName = localName;
        this.sourceModuleName = sourceModuleName;
        this.exportedName = exportedName;
        this.isDefaultImport = isDefaultImport;
        this.isNamespaceImport = isNamespaceImport;
    }

    public toPojo(): ImportPojo {
        return {
            id: this.id,
            module: this.module.toPojo(),
            localName:this.localName,
            sourceModuleName:this.sourceModuleName,
            exportedName:this.exportedName,
            isDefaultImport:this.isDefaultImport,
            isNamespaceImport:this.isNamespaceImport,
        }
    }

    public toString(): string {
        return `<Import ${this.module.name} ${this.localName}/>`;
    }
}
