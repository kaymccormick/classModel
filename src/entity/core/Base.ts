import {Column, PrimaryGeneratedColumn, Generated} from "typeorm";

export class Base {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    @Generated('uuid')
    public uuid?: string;

    @Column()
    public name?: string;

    @Column({nullable: true, name: 'createdby'})
    public createdBy?: string;

    @Column({nullable: true, name: 'origin'})
    public origin?: string;
}
