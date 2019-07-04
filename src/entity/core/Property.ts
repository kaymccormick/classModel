import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany} from "typeorm";

export class Property {
    @Column()
    public name: string;

    @Column()
    public computed?: boolean;
    
    @Column()
    public readonly?: boolean;
    
    @Column()
    public optional?: boolean;
    
    @Column()
    public hasInitializer?: boolean;

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode: any;
}
