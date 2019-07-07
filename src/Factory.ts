import{ CreateTypeManagerArgs } from './args';
import{TypeManager} from './TypeManager';

export function createTypeManager(args: CreateTypeManagerArgs) {
return new TypeManager(args);
}

