/**
 * @uuid f804488b-20d3-4001-a16b-de71033d66aa
 */
import { CreateManagerArgs } from './args';
import {TypeManager} from './TypeManager';

export function createTypeManager(args: CreateManagerArgs) {
    return new TypeManager(args);
}

