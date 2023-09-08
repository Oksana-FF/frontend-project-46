import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const getPathFile1 = path.resolve(process.cwd(), './__fixtures__/file1.json');
  const getPathFile2 = path.resolve(process.cwd(), './__fixtures__/file2.json');
    
  obj1 = JSON.parse(fs.readFileSync(getPathFile1, 'utf8'));
  obj2 = JSON.parse(fs.readFileSync(getPathFile2, 'utf8'));

  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  return keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) return {key: key, value: obj2[key], type:'added'};
    if (!Object.hasOwn(obj2, key)) return {key: key, value: obj1[key], type:'deleted'};
    if (obj1[key] !== obj2[key]) return {key: key, value1: obj1[key], value2: obj2[key], type:'changed'};
    if (obj1[key] === obj2[key]) return {key: key, value: obj1[key], type:'unchanged'};
  })
};

export default makeTree;