import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany,ManyToMany,JoinColumn} from "typeorm";
import {Module} from './Module';
import {Property} from './Property';
import {InterfaceMethod} from "./InterfaceMethod";
import {InterfaceProperty} from "./InterfaceProperty";
import {InterfacePojo} from '../../pojo';
import { Base } from './Base';

@Entity()
export class Interface extends Base {
    @ManyToOne(type => Module, module => module.classes)
    public module?: Module;

    @ManyToOne(type => Interface, interface_ => interface_.subinterfaces, { nullable: true })
    public extends?: Interface;

    @OneToMany(type => Interface, interface_ => interface_.extends, { nullable: true})
    public subinterfaces?: Interface[];

    @OneToMany(type => InterfaceMethod, m => m.interface_)
    public methods?: InterfaceMethod[];

    @OneToMany(type => InterfaceProperty, prop => prop.iface)
    public properties?: InterfaceProperty[];
    
    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode: any;

    public toPojo(): InterfacePojo {
        return {id:this.id,
            module: this.module ?this.module.toPojo():undefined,
            extends: this.extends ?this.extends.toPojo():undefined,
            subinterfaces: this.subinterfaces ?this.subinterfaces.map(i => i.toPojo()) : [],
            methods: this.methods? this.methods.map(m => m.toPojo()) :[],
            name:this.name,
            properties:this.properties?this.properties.map(p=>p.toPojo()):[],
            astNode:this.astNode,
        }
    }


}
