/**
 * @uuid b17c0089-ee22-4e8b-aaf0-3b6991714e09
 */
import { Column, PrimaryGeneratedColumn, Generated } from "typeorm";

/*
 * @uuid f646e653-a085-48ff-986d-f1b535533230
*/
export class Base {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    @Generated('uuid')
    public uuid?: string;

    @Column({nullable: true})
    public name?: string;

    @Column({nullable: true, name: 'createdby'})
    public createdBy?: string;

    @Column({nullable: true, name: 'origin'})
    public origin?: string;
}
