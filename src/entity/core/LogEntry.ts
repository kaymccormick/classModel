import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {Component} from './Component';
import {UniversalBase} from '../core/UniversalBase';

@Entity()
export class LogEntry extends UniversalBase {
  @Column()
    public componentId?: number;

  @ManyToOne(type => Component)
  public component?: Component;

  public message?: string;
}
