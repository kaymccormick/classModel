import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {UniversalBase} from '../core/UniversalBase';

@Entity()
export class Component extends UniversalBase {
}
