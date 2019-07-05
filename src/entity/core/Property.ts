import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany,JoinColumn} from "typeorm";
import {TSType} from './TSType';

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
}
