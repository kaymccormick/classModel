import {PrimaryGeneratedColumn, Column, ManyToOne,Generated} from 'typeorm';
import {User} from './User';

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

    @ManyToOne(type => User)
    public owner?: User;

    @Column({type: 'bigint'})
    public flags?: number;

    @Column({type: 'bigint'})
    public permissions?: number;
}
