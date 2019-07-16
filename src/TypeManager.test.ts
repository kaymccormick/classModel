/**
 * @uuid 32e50781-1530-4d6a-9de5-2199b72b1e1f
 */
import { TypeManager } from './TypeManager';
import { Connection } from 'typeorm';
jest.mock('typeorm');

test('TypeManager.constructor', () => {
    const t = new TypeManager({});
});
   
test('TypeManager.findType', () => {
    const t = new TypeManager({});
    t.findType(1, { type: 'TSNumberSymbol' });
});
   

test.only('TypeManager.buildType', () => {
const connection = new Connection({});
    const t = new TypeManager({connection});
    t.findType(1, { type: 'TSNumberSymbol' });
});
   

