/**
 * @uuid 08a7ba4e-0f25-4eec-9b36-3361fe28f13a
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";
import {UniversalBase} from './UniversalBase';

/*
 * @uuid a7bd1fdb-9b06-4312-ae62-e278dea2be26
*/
@Entity()
export class User extends UniversalBase {
}
