import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";
import {UniversalBase} from './UniversalBase';

@Entity()
export class User extends UniversalBase {
}
