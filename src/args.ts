import{ Connection } from 'typeorm';
import {Logger} from 'winston';
import { FactoryInterface } from './types';

export interface CreateTypeManagerArgs {
    connection?: Connection;
    createdBy?: string;
    logger?: Logger;
    factory?: FactoryInterface;
}
