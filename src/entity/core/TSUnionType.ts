/**
 * @uuid 137d2618-0334-4152-babe-46ef5ffb0f35
 */
import {
    Column,
    Entity,
    JoinTable,
    JoinColumn,
    OneToOne,
    ManyToMany,
} from "typeorm";
import { TSType } from './TSType';
import { TypeBase } from './TypeBase';

/*
 * @uuid aa356ecd-652c-448c-9834-4666a8468dc0
*/
@Entity()
export class TSUnionType extends TypeBase {

    @OneToOne(type => TSType)
    @JoinColumn({name: 'basetstypeid'})
    public tsType?: TSType;

    /*    @OneToOne(type => Name, { nullable: true })
    @JoinColumn()
    public typeName?: Name;*/

    @ManyToMany(type => TSType, { cascade: false })
    @JoinTable()
    public types?: TSType[];

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

}
