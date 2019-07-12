import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne,JoinColumn,OneToOne} from "typeorm";
import {List} from "immutable";
import { TypeEnum } from './TypeEnum';
import { Name } from './Name';
import { Base } from './Base';

@Entity()
export class Type extends Base {
    @OneToOne(type => Name)
    @JoinColumn()
    public typeName?: Name;

    @Column({name: 'basetype', nullable: true})
    public baseType?: TypeEnum;

}
