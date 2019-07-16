import { Connection, Repository } from 'typeorm';
import EntityCore from './entityCore';
import { namedTypes } from 'ast-types';
import{ CreateManagerArgs } from './args';
import{ FactoryInterface } from './types';
import winston,{Logger} from 'winston';

export class NameManager {
// @ts-ignore
    private connection: Connection;
    private createdBy?: string;
    private logger: winston.Logger;
    private factory: FactoryInterface;

    public constructor(args: CreateManagerArgs) {
        if(args.connection === undefined) {
            throw new Error('need connection');
        }
        this.connection = args.connection;
        
        this.createdBy = args.createdBy;
        if(!args.logger) {
            throw new Error('need logger');
        }
        this.logger = args.logger;
        if(!args.factory) {
            throw new Error('need factory');
        }
        this.factory = args.factory;
    }
}
