/**
 * @uuid ea1240b0-9709-4583-abda-d6c8cef0c7ce
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from "typeorm";
import {List} from "immutable";
import { TypeEnum } from './TypeEnum';
import { Name } from './Name';
import { Module } from './Module';
import { Base } from './Base';
import { TSTypeAliasPojo } from '../../pojo';
import {PojoBuildArguments, PojoBuilder} from '../../types';


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

 * @uuid bcaece81-2283-4116-9dfe-680b47ffcc99
*/
@Entity()
export class TSTypeAlias extends Base {
    @Column()
    public declare?: boolean;

    @OneToOne(type => Name, { nullable: true })
    @JoinColumn()
    public typeName?: Name;

    @Column({name: 'basetype', nullable: true})
    public baseType?: TypeEnum;

    @Column()
    public moduleId?: number;
    
    @ManyToOne(type => Module)
    @JoinColumn({name: 'moduleid'})
    public module?: Module;

    public toPojo(args?: PojoBuildArguments): TSTypeAliasPojo {
    return {};
    
    }
}
