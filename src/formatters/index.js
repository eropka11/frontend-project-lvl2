import path from 'path';
import parse from '../parser.js';
import makeAST from '../makeAST.js';
import diff from '../diff.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (filepath1, filepath2, formatter) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);
  const file1 = parse(path1);
  if (typeof file1 === 'string') {
    return file1;
  }
  const file2 = parse(path2);
  if (typeof file2 === 'string') {
    return file2;
  }
  const AST1 = makeAST(file1, '- ', '');
  const AST2 = makeAST(file2, '+ ', '');
  const difference = diff(AST1, AST2);
  if (formatter === 'plain') {
    return plain(difference);
  }
  if (formatter === 'json') {
    return JSON.stringify(json(difference));
  }
  return `${stylish(difference)}\n}`;
};
