import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany,JoinColumn} from "typeorm";
import {TSType} from './TSType';
import {PropertyPojo} from '../../pojo';

export class Property {
    @Column()
    public name?: string;

    @Column()
    public computed?: boolean;
    
    @Column()
    public readonly?: boolean;
    
    @Column()
    public optional?: boolean;
    
    @Column()
    public hasInitializer?: boolean;

    @ManyToOne(type => TSType)
    @JoinColumn()
    public type?: TSType;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode: any;

public toPojo(): PropertyPojo {
return {
name: this.name,
computed: this.computed,
readonly:this.readonly,
optional:this.optional,
hasInitializer:this.hasInitializer,
type:this.type?this.type.toPojo():undefined,
astNode:this.astNode,
}
}
}
