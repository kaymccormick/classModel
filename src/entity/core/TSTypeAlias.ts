import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinColumn,OneToOne} from "typeorm";
import {List} from "immutable";
import { TypeEnum } from './TypeEnum';
import { Name } from './Name';
import { Module } from './Module';

/*
TSExpressionWithTypeArguments | TSTypeReference | TSAnyKeyword |
TSBigIntKeyword | TSBooleanKeyword | TSNeverKeyword | TSNullKeyword |
TSNumberKeyword | TSObjectKeyword | TSStringKeyword | TSSymbolKeyword |
TSUndefinedKeyword | TSUnknownKeyword | TSVoidKeyword | TSThisType |
TSArrayType | TSLiteralType | TSUnionType | TSIntersectionType |
TSConditionalType | TSInferType | TSParenthesizedType | TSFunctionType |
TSConstructorType | TSMappedType | TSTupleType | TSRestType |
TSOptionalType | TSIndexedAccessType | TSTypeOperator | TSTypeQuery |
TSImportType | TSTypeLiteral;
*/
@Entity()
export class TSTypeAlias {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

    @Column()
    public declare?: boolean;

    @OneToOne(type => Name, { nullable: true })
    @JoinColumn()
    public typeName?: Name;

    @Column({name: 'basetype', nullable: true})
    public baseType?: TypeEnum;

    @ManyToOne(type => Module)
    @JoinColumn()
    public module?: Module;

    constructor() {
    }
}
