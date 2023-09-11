import makeTree from './makeTree.js';

const genDiff = (obj1, obj2) => {
  const tree = makeTree(obj1, obj2);
  const rawTree = tree.map((newValue) => {
    if (newValue.type === 'added') return `  + ${newValue.key}: ${newValue.value}`;
    if (newValue.type === 'deleted') return `  - ${newValue.key}: ${newValue.value}`;
    if (newValue.type === 'changed') return `  - ${newValue.key}: ${newValue.value1}\n  + ${newValue.key}: ${newValue.value2}`;
    if (newValue.type === 'unchanged') return `    ${newValue.key}: ${newValue.value}`}).join('\n');
  const result = `{\n${rawTree}\n}`;
  return result;
};

export default genDiff;
