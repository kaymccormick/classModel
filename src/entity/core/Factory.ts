/**
 * @uuid 895096cc-0ebc-4b06-911f-664b504694b5
 */
import * as EntityCore from './';
import {Logger} from 'winston';
import { FactoryInterface } from '../../types';
import winston from 'winston';

/*
 * @uuid c80360cc-406f-483c-acbe-00af5839d5a9
*/
export class Factory implements FactoryInterface {
    public constructor(private logger: Logger = winston.createLogger({})) {
    }
    public createTSType() {
        return new EntityCore.TSType(this.logger);
    }
}
