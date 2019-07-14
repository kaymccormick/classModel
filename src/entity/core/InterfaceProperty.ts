/**
 * @uuid db923786-9845-4368-86d5-df310936a9e3
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinColumn,
} from "typeorm";
import {Interface} from './Interface';
import {InterfacePropertyPojo} from '../../pojo';
import {TSType} from './TSType';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";

/*
 * @uuid 316bc2ce-bae3-4c5a-9271-6ff6eea9b0a7
*/
@Entity()
export class InterfaceProperty extends Base implements PojoBuilder<InterfacePropertyPojo> {
    @ManyToOne(type => Interface, iface => iface.properties)
    public iface?: Interface;

    @Column()
    public computed?: boolean;

    @Column()
    public readonly?: boolean;

    @Column()
    public optional?: boolean;

    @Column()
    public hasInitializer?: boolean;

    @ManyToOne(type => TSType)
    @JoinColumn()
    public type?: TSType;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

    public toPojo(args?: PojoBuildArguments): InterfacePropertyPojo {
        return { id: this.id,
        iface: this.iface ? this.iface.toPojo() : undefined,
            computed: this.computed,
            readonly:this.readonly,
            optional:this.optional,
            hasInitializer:this.hasInitializer,
            type:this.type?this.type.toPojo():undefined,
            astNode:this.astNode,
            };
}
}
