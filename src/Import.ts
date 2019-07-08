import {AppImportPojo as ImportPojo, PojoBuilder} from "./types";

export class Import implements PojoBuilder<ImportPojo> {
    public localName?: string;
    public exportedName?: string;
    public sourceModule: string;
    public isDefaultImport: boolean;
    public isNamespaceImport: boolean;

    public constructor(sourceModule: string, localName?: string, exportedName?: string, isDefaultImport: boolean = false, isNamespaceImport: boolean = false) {
        this.localName = localName;
        this.exportedName = exportedName;
        this.sourceModule = sourceModule;
        this.isDefaultImport = isDefaultImport;
        this.isNamespaceImport = isNamespaceImport;
    }

    public toPojo(): ImportPojo {
        return this;
    }

    public static fromPojo(v: ImportPojo): Import {
        return new Import(v.sourceModule, v.localName, v.exportedName, v.isDefaultImport, v.isNamespaceImport);

    }
}
