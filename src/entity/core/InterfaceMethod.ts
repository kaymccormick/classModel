/**
 * @uuid 8fbbf478-d2f9-4dc0-8ebe-5fb435c2f529
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import {Parameter} from "./Parameter";
import {Interface} from "./Interface";
import{InterfaceMethodPojo} from '../../pojo';
import { Base } from './Base';
import {PojoBuildArguments, PojoBuilder} from "../../types";

/*
 * @uuid e837586c-69c6-4396-9678-906bff1dfc73
*/
@Entity()
export class InterfaceMethod extends Base implements PojoBuilder<InterfaceMethodPojo> {
    @OneToMany(type => Parameter, parameter => parameter.method)
    public parameters?: Parameter[];

    @ManyToOne(type => Interface, i => i.methods)
    public interface_?: Interface;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

@Column({nullable: true})
    public accessibility?: string;

public toPojo(args?: PojoBuildArguments): InterfaceMethodPojo {
    return {id:this.id,name:this.name,parameters:this.parameters?this.parameters.map(p=>p.toPojo()):[],accessibility:this.accessibility}
}

}
