import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Parameter} from "./Parameter";
import {Interface} from "./Interface";
import{InterfaceMethodPojo} from '../../pojo';

@Entity()
export class InterfaceMethod {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

    @OneToMany(type => Parameter, parameter => parameter.method)
    public parameters?: Parameter[];

    @ManyToOne(type => Interface, i => i.methods)
    public interface_?: Interface;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

@Column({nullable: true})
    public accessibility?: string;

public toPojo(): InterfaceMethodPojo {
    return {id:this.id,name:this.name,parameters:this.parameters?this.parameters.map(p=>p.toPojo()):[],accessibility:this.accessibility}
}

public constructor() {
}
}
