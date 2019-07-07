import * as EntityCore from'./';
import {Logger} from 'winston';
import { FactoryInterface } from '../../types';
import winston from 'winston';

export class Factory implements FactoryInterface {
public constructor(private logger: Logger = winston.createLogger({})) {
}
public createTSType() {
return new EntityCore.TSType(this.logger);
}
}
