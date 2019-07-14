/**
 * @uuid 9b93ce5b-0aa0-4fbf-a4fe-36cff45f97dc
 */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Component} from './Component';
import {UniversalBase} from '../core/UniversalBase';

/*
 * @uuid 160fb491-809b-4ece-8513-5f066cac4bd5
*/
@Entity()
export class LogEntry extends UniversalBase {
  @Column()
    public componentId?: number;

  /*  @ManyToOne(type => Component)
  public component?: Component;
*/
  @Column({type: 'jsonb'})
  public meta?: any;

  public message?: string;
}
