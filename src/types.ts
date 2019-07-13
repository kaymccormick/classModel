import {Map} from 'immutable';
import * as EntityCore from './entity/core';
import {MethodPojo} from "./pojo";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export  interface GetRegistryInvocationArgs {

}


export interface FactoryInterface {
    createTSType(): EntityCore.TSType;
}


export interface PojoBuildArguments {
minimal?: boolean;
}
export interface PojoBuilder<T> {
    toPojo(args:PojoBuildArguments): T;
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

//export type ModuleMap = Map<string, Module>;
export interface InterfaceTemplateParameterPojo {
}
