import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany,ManyToMany,JoinColumn} from "typeorm";
import {Module} from './Module';
import {Property} from './Property';
import {InterfaceMethod} from "./InterfaceMethod";
import {InterfaceProperty} from "./InterfaceProperty";

@Entity()
export class Interface {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(type => Module, module => module.classes)
    public module?: Module;

    @ManyToOne(type => Interface, interface_ => interface_.subinterfaces, { nullable: true })
    public extends?: Interface;

    @OneToMany(type => Interface, interface_ => interface_.extends, { nullable: true})
    public subinterfaces?: Interface[];

    @OneToMany(type => InterfaceMethod, m => m.interface_)
    public methods?: InterfaceMethod[];

    @Column()
    public name?: string;

    @OneToMany(type => InterfaceProperty, prop => prop.iface)
    public properties?: InterfaceProperty[];
    
    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode: any;

/*    @ManyToMany(type => Property, { cascade:true })
    @JoinColumn()
    public properties?: Property[];*/
    public constructor() {
    }
}
