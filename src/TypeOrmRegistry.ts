import {Registry} from "./types";
import {List, Map} from 'immutable';
import {Module} from "./Module";
import {Connection} from "typeorm";
import {Class, Export, Import, Module as EntityModule, Project} from './entity/core'

export class TypeOrmRegistry implements Registry {
    public modules: Map<string, Module> = Map<string, Module>();
    private connection: Connection;
    private project: Project;
constructor(connection: Connection, project: Project) {
    this.connection = connection;
    this.project = project;

}
    getModule(key: string, name: string, create?: boolean): Module | undefined {
    const m = new EntityModule(name, this.project, List<Class>(),
        List<Export>(), List<Import>());
    this.modules.
    this.connection.manager.save(m))
    return undefined;
    }

    getModuleByName(name: string): Module | undefined {
        return undefined;
    }

    getModuleKey(name: string): string {
        //const module: EntityModule = new EntityModule();
        return "";
    }

    init(): void {
    }

    save(): void {
    }

    setModule(key: string, module: Module): void {
    }

}
