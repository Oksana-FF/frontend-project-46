import _ from 'lodash';
import fs from 'fs';


const genDiff = (obj1, obj2) => {
    obj1 = JSON.parse(fs.readFileSync('file1.json', 'utf8'));
    obj2 = JSON.parse(fs.readFileSync('file2.json', 'utf8'));

    const result = [];
    const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();

    for (const key of keys) {
        if (!Object.hasOwn(obj1, key)) {
          result.push({key: key, value: obj2[key], type:'added'});
        } else if (!Object.hasOwn(obj2, key)) {
          result.push({key: key, value: obj1[key], type:'deleted'});
        } else if (obj1[key] !== obj2[key]) {
            result.push({key: key, value: obj1[key], type:'past'});
            result.push({key: key, value: obj2[key], type:'now'});
        } else {
            result.push({key: key, value: obj1[key], type:'unchanged'});
        }
      }
     return result.map((newValue) => {
        if (newValue.type === 'added') return `+ ${newValue.key}: ${newValue.value}`;
        if (newValue.type === 'deleted') return `- ${newValue.key}: ${newValue.value}`;
        if (newValue.type === 'past') return `- ${newValue.key}: ${newValue.value}`;
        if (newValue.type === 'now') return `+ ${newValue.key}: ${newValue.value}`;
        if (newValue.type === 'unchanged') return `  ${newValue.key}: ${newValue.value}`}).join('\n');

     };
export default genDiff;
