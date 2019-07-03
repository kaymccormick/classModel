import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";
import {Module} from './Module';
import {InterfaceMethod} from "./InterfaceMethod";

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
    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode: any;

    public constructor() {
    }
}
