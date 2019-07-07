import {Map} from 'immutable';
import {Module} from "./Module";
import * as EntityCore from './entity/core';
import {MethodPojo, ModulePojo} from "./pojo";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export  interface GetRegistryInvocationArgs {

}


export interface FactoryInterface {
  createTSType(): EntityCore.TSType;
}

export interface PojoBuilder<T> {
    toPojo(): T;
}
export interface ModuleClassPojo {
    name: string;
    moduleKey?: string;
    superSpec?: ReferencePojo;
    methods: Map<string, MethodPojo>;
    moduleName?: string;
}

export interface TypePojo {
    nodeType: string;
    tree: {};

}

export interface AppExportPojo {
    name?: string;
    localName?: string;
    isDefaultExport?: boolean;
}
export interface ReferencePojo {
    name: string;
    property?: string;

}

export interface AppImportPojo {
    localName?: string;
    exportedName?: string;
    sourceModule: string;
    isDefaultImport: boolean;
    isNamespaceImport: boolean;
}

export interface AppModulePojo {
    name: string;
    key: string;
    classes: Map<string, ModuleClassPojo>;
    exports: Map<string, AppExportPojo>;
    imports: Map<string, AppImportPojo>;
    references: Map<string, ReferencePojo>;
}

export interface Initializable {
    init(): void;
}

export type ModuleMap = Map<string, Module>;

export interface GetModuleFunction {
    (key: string, name: string, create?: boolean): Module | undefined;
}
export interface RegistryBase {
    getModule (key: string, name: string, create?: boolean): Promise<Module>;
    getModuleByName(name: string): Module | undefined;
    getModuleKey(name: string): string;
    setModule(key: string, module: Module): void;
}

/* How does Registry differ from SimpleDataRegistry? */
export interface Registry extends Initializable, RegistryBase{
    /**
     * @deprecated
     */
    modules: ModuleMap;
    save(): void;
}

export interface SimpleRegistryPojo {
    runId?: number;
    modules: Map<string, ModulePojo>;
    moduleKeys: Map<string, string>;
}

export interface SimpleRegistryData extends RegistryBase {
    moduleNames: Map<string, string>;
    moduleKeys: Map<string, string>;
    runId?: number;
    /**
     * @deprecated
     */
    modules: Map<string, Module>;

    getModuleKey(moduleName: string): string;


    getModuleByName(name: string): Module | undefined;

    setModule(moduleKey: string, module: Module): void;
}
