import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinColumn,OneToOne,ManyToMany,AfterInsert,BeforeInsert,AfterLoad} from "typeorm";
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
export class TSType {
    @PrimaryGeneratedColumn()
    public id?: number;

/*    @OneToOne(type => Name, { nullable: true })
    @JoinColumn()
    public typeName?: Name;*/

    @Column({name: 'tsnodetype'})
    public tsNodeType?: string;

    @Column({name: 'basetype', nullable: true})
    public baseType?: TypeEnum;

    @Column()
    public moduleId?: number;

    @ManyToOne(type => Module, module => module.types)
    @JoinColumn()
    public module?: Module;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

    @AfterInsert()
    afterInsert() {
    console.log('after insert');
    }

    constructor() {
    }
}
