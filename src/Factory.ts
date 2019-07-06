import {Module} from "./Module";
import{ CreateTypeManagerArgs } from './args';
import{TypeManager} from './TypeManager';

export interface CreateModuleFunction {
  (name: string): Module;
}

function createModule(key: string, name: string): Module {
  return new Module(key, name);
}

export function createTypeManager(args: CreateTypeManagerArgs) {
return new TypeManager(args);
}


export { createModule };
