#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import parse from '../src/parser.js';
import makeAST from '../src/makeAST.js';
import diff from '../src/diff.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
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
    if (program.opts().format === 'plain') {
      const result = plain(difference);
      console.log(result);
      return result;
    }
    const result = `${stylish(difference, 0)}\n}`;
    console.log(result);
    return result;
  })
  .parse(process.argv);

export default program;
