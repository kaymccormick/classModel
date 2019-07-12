import {TypeEnum} from "./entity/core";
import {TypePojo} from "./types";

export interface BasePojo {
    id?: number;
    name?: string;
    uuid?: string;
    origin?: string;
    createdBy?: string;
}

export interface NamePojo extends BasePojo {
    moduleId?: number;
    module?: ModulePojo;
    nameKind?: string;
    astNode: any;
}

export interface ClassPojo extends BasePojo {
    moduleId?: number;
    module?: ModulePojo;
    superClass?: ClassPojo;
    subClasses?: ClassPojo[];
    implements?: InterfacePojo[];
    methods?: MethodPojo[];
    astNode?: any;
    superClassNode?: any;
    implementsNode?: any;
}

export interface ExportPojo  extends BasePojo {
    exportedName?: string;
    module?: ModulePojo;
    isDefaultExport?: boolean;
}

export interface ImportPojo  extends BasePojo {
    module?: ModulePojo;
    sourceModuleName?: string;
    exportedName?: string;
    isDefaultImport?: boolean;
    isNamespaceImport?: boolean;
}

export interface InterfacePojo  extends BasePojo {
    module?: ModulePojo;
    extends?: InterfacePojo;
    subinterfaces?: InterfacePojo[];
    methods?: InterfaceMethodPojo[];
    properties?: InterfacePropertyPojo[];
    astNode: any;
}

export interface InterfacePropertyPojo {
}

export interface ModulePojo extends BasePojo {
    projectId?: number;
    project?: ProjectPojo;
    classes?: ClassPojo[];
    defaultExport?: ExportPojo;
    exports?: ExportPojo[];
    imports?: ImportPojo[];
    names?: NamePojo[];
    types?: TSTypePojo[];
}

export interface ProjectPojo extends BasePojo {
    modules?: ModulePojo[];
}

export interface TSTypePojo extends BasePojo {
    tsNodeType?: string;
    baseType?: TypeEnum;
    moduleId?: number;
    astNode?: any;
}

export interface ParameterPojo extends BasePojo {
    ordinal?: number;
    type?: TSTypePojo;
    method?: MethodPojo;
}

export interface MethodPojo extends BasePojo {
    classProperty: ClassPojo;
    parameters: ParameterPojo[];
    astNode?: any;
    accessibility?: string;
}
export interface InterfaceMethodPojo extends BasePojo {
    parameters?: ParameterPojo[];
    interface_?: InterfacePojo;
    astNode?: any;
    accessibility?: string;
}
export interface InterfacePropertyPojo extends BasePojo {
    iface?: InterfacePojo;
    property?: PropertyPojo;
}

export interface PropertyPojo  {
    computed?: boolean;
    readonly?: boolean;
    optional?: boolean;
    hasInitializer?: boolean;
    type?: TSTypePojo;
    astNode: any;
}
