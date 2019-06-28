import {Registry} from "./types";
import {List, Map} from 'immutable';
import {Module} from "./Module";
import {Connection} from "typeorm";
import {Class, Export, Import, Module as EntityModule, Project} from './entity/core'

export class TypeOrmRegistry implements Registry {

    public modules: Map<string, Module> = Map<string, Module>();
    public entityModules: Map<string, EntityModule> = Map<string, EntityModule>();
    private connection: Connection;
    private project: Project;
constructor(connection: Connection, project: Project) {
    this.connection = connection;
    this.project = project;

}
    getModule(key: string, name: string, create?: boolean): Promise<Module> {
    const moduleRepository = this.connection.getRepository(EntityModule);
    // @ts-ignore
        return moduleRepository.find({ project: this.project, name}).then((modules) =>{
        if(modules.length) {
            return modules[0];
        }
        const m = new EntityModule(name, this.project, [], [], []);
        return moduleRepository.save(m);
        }).catch(error => {
        console.log(error);
    });
    }
    //
    // const m = new EntityModule(name, this.project, List<Class>(),
    //     List<Export>(), List<Import>());
    //
    // this.connection.manager.save(m))
    // return undefined;
    // }

    public getModuleByName(name: string): Module | undefined {
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
