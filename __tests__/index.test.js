import genDiff from '../src/index.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff', () => {
    const current = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    const result = fs.readFileSync(getFixturePath('result1.txt'), 'utf-8')
    expect(current).toEqual(result);
});
