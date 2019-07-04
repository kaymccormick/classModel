import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany,ManyToMany,JoinColumn} from "typeorm";
import {Interface} from './Interface';
import {Property} from './Interface';
export class InterfaceProperty {
@ManyToOne(type => Interface, iface => iface.properties)
public iface?: Interface;

@Column(type => Property)
public property?: Property;

}
