/**
 * @uuid 79aaa26c-df7b-40b0-9726-97916cc693d9
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import {List} from "immutable";
import { Type } from './Type';
import { Base } from './Base';

/*
 * @uuid 6fbbda90-8122-4600-8a82-4d519896afc7
*/
@Entity()
export class TypeParameter extends Base {
    @Column()
    public ordinal?: number;

    @ManyToOne(type => Type)
    @JoinColumn()
    public type?: Type;

    constructor(name: string) {
        super();
        this.name = name;
    }
}
