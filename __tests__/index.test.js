import genDiff from '../src/index.js';
import { dirname } from 'path';

test('genDiff', () => {
    expect(genDiff().toEqual());
});