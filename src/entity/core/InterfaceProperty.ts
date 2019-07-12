import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany,ManyToMany,JoinColumn} from "typeorm";
import {Interface} from './Interface';
import {Property} from './Property';
import {InterfacePropertyPojo} from '../../pojo';
import { Base } from './Base';

@Entity()
export class InterfaceProperty extends Base {
    @ManyToOne(type => Interface, iface => iface.properties)
    public iface?: Interface;

    @Column(type => Property)
    public property?: Property;

public toPojo(): InterfacePropertyPojo {
    return { id: this.id, iface: this.iface ? this.iface.toPojo() : undefined, property: this.property ? this.property.toPojo() : undefined};
}

}
