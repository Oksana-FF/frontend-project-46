import genDiff from '../src/index.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff-json', () => {
  const current = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const result = fs.readFileSync(getFixturePath('result1.txt'), 'utf-8');
  expect(current).toEqual(result);
});

test('genDiff-yaml', () => {
  const current = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  const result = fs.readFileSync(getFixturePath('result1.txt'), 'utf-8');
  expect(current).toEqual(result);
});
