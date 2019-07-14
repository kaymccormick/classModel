/**
 * @uuid 0870c8f5-87e8-4d7d-88a9-dbdbb35f578a
 */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {UniversalBase} from '../core/UniversalBase';

/*
 * @uuid b70e98a7-d269-4e62-9099-35380e0d8add
*/
@Entity()
export class Component extends UniversalBase {
}
