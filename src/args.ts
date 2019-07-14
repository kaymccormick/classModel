/**
 * @uuid 54db1efe-b237-4f64-894e-0ed26b1f6bd2
 */
import { Connection } from 'typeorm';
import {Logger} from 'winston';
import { FactoryInterface } from './types';

export interface CreateTypeManagerArgs {
    connection?: Connection;
    createdBy?: string;
    logger?: Logger;
    factory?: FactoryInterface;
}
