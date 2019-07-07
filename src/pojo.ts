import {TypeEnum} from "./entity/core";
import {TypePojo} from "./types";

export interface NamePojo {
    id?: number;

    moduleId?: number;

    module?: ModulePojo;

    name?: string;

    nameKind?: string;

    astNode: any;
}

export interface ClassPojo {
    id?: number;
    uuid?: string;
    moduleId?: number;
    module?: ModulePojo;
    superClass?: ClassPojo;
    subClasses?: ClassPojo[];
    implements?: InterfacePojo[];
    name?: string;
    methods?: MethodPojo[];
    astNode?: any;
    superClassNode?: any;
    implementsNode?: any;
}

export interface ExportPojo {
    id?: number;

    localName?: string;

    exportedName?: string;

    module?: ModulePojo;

    isDefaultExport?: boolean;
}

export interface ImportPojo {
    id?: number;
    module?: ModulePojo;
    localName?: string;
    sourceModuleName?: string;
    exportedName?: string;
    isDefaultImport?: boolean;
    isNamespaceImport?: boolean;
}

export interface InterfacePojo {
    id?: number;

    module?: ModulePojo;

    extends?: InterfacePojo;

    subinterfaces?: InterfacePojo[];

    methods?: InterfaceMethodPojo[];

    name?: string;

    properties?: InterfacePropertyPojo[];

    astNode: any;

}

export interface InterfacePropertyPojo {
}

export interface ModulePojo {
    id?: number;

    name?: string;

    projectId?: number;

    project?: ProjectPojo;

    classes?: ClassPojo[];

    defaultExport?: ExportPojo;

    exports?: ExportPojo[];

    imports?: ImportPojo[];

    names?: NamePojo[];

    types?: TSTypePojo[];
}

export interface ProjectPojo {
    id?: number;

    name?: string;

    modules?: ModulePojo[];
}

export interface TSTypePojo {
    id?: number;
    createdBy?: string;
    origin?: string;
    tsNodeType?: string;
    baseType?: TypeEnum;
    moduleId?: number;
    astNode?: any;
}

export interface ParameterPojo {
    id?:number;
    name?: string;
    ordinal?: number;
    type?: TSTypePojo;
    method?: MethodPojo;
}

export interface MethodPojo {
    id?: number;
    name: string;
    classProperty: ClassPojo;
    parameters: ParameterPojo[];
    astNode?: any;
    accessibility?: string;
}
export interface InterfaceMethodPojo {
id?: number;

name?: string;

parameters?: ParameterPojo[];
interface_?: InterfacePojo;
astNode?: any;
accessibility?: string;
}
export interface InterfacePropertyPojo {
id?:number,
iface?:InterfacePojo,
property?:PropertyPojo,
}

export interface PropertyPojo {
name?: string;

computed?: boolean;
    
readonly?: boolean;
optional?: boolean;
hasInitializer?: boolean;
type?: TSTypePojo;
astNode: any;
}
