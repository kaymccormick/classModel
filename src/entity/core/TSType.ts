/**
 * @uuid 17cb9c05-a6dd-4144-9eba-7c2fdf40ccc7
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    ManyToMany,
    AfterInsert,
    BeforeInsert,
    AfterLoad,
} from "typeorm";
import {List} from "immutable";
import { TypeEnum } from './TypeEnum';
import { Name } from './Name';
import { Module } from './Module';
import {Logger} from "winston";
import {PojoBuildArguments, PojoBuilder} from '../../types';import {TSTypePojo} from "../../pojo";
import { Base } from './Base';

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

 * @uuid a349ab6b-7828-4323-a1e2-546a3940b8c3
*/
@Entity()
export class TSType extends Base implements PojoBuilder<TSTypePojo> {
    /*    @OneToOne(type => Name, { nullable: true })
    @JoinColumn()
    public typeName?: Name;*/

    @Column({name: 'tsnodetype',nullable:true})
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
        this.logger.info('after insert', { tstype: this.toPojo() });
    }

    constructor(private logger: Logger) {
        super();
    }

    public toPojo(args?: PojoBuildArguments): TSTypePojo {
        return {
            id: this.id,
            createdBy: this.createdBy,
            origin:this.origin,
            tsNodeType:this.tsNodeType,
            baseType: this.baseType,
            moduleId:this.moduleId,
            astNode:this.astNode,
        }
    }

    public toString(): string {
        return `<TSType{${this.id}} module=${this.module||this.moduleId} astNode=${JSON.stringify(this.astNode)}/>`;
    }
}
