/**
 * @uuid 621097ed-fd6d-4191-a761-753b4a70c1af
 */
import { PrimaryGeneratedColumn, Column, ManyToOne, Generated } from 'typeorm';
import {User} from './User';

/*
 * @uuid b5951bea-f798-4a3d-85dc-755d44bcbd59
*/
export class UniversalBase {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    @Generated('uuid')
    public uuid?: string;

    @Column({nullable: true})
    public commonName?: string;

    @Column({nullable: true})
    public displayName?: string;

    /*    @ManyToOne(type => User)
    public owner?: User;*/

    @Column({nullable: true})
    public ownerId?: number;

    @Column({type: 'bigint'})
    public flags?: number;

    @Column({type: 'bigint'})
    public permissions?: number;
}
