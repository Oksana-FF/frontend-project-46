import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import parsers from './parsers.js';

const readFile = (filePath) => {
  const absolutPath = path.resolve(process.cwd(), filePath);
  const dataOfFile = fs.readFileSync(absolutPath, 'utf8');
  return dataOfFile;
};

const getData = (filePath) => {
  const ext = path.extname(filePath);
  const data = parsers(readFile(filePath), ext);
  return data;
};

const makeTree = (filePath1, filePath2) => {
  const obj1 = getData(filePath1);
  const obj2 = getData(filePath2);

  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  return keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) return { key, value: obj2[key], type: 'added' };
    if (!Object.hasOwn(obj2, key)) return { key, value: obj1[key], type: 'deleted' };
    if (obj1[key] !== obj2[key]) return { key, value1: obj1[key], value2: obj2[key], type: 'changed' };
    if (obj1[key] === obj2[key]) return { key, value: obj1[key], type: 'unchanged' };
  });
};

export default makeTree;
