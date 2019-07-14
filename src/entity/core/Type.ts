/**
 * @uuid 12d62d7c-b986-4118-b655-a6715676e610
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from "typeorm";
import {List} from "immutable";
import { TypeEnum } from './TypeEnum';
import { Name } from './Name';
import { Base } from './Base';

/*
 * @uuid 7891c4f5-df2c-4095-bc15-3206c342d7a6
*/
@Entity()
export class Type extends Base {
    @OneToOne(type => Name)
    @JoinColumn()
    public typeName?: Name;

    @Column({name: 'basetype', nullable: true})
    public baseType?: TypeEnum;

}
