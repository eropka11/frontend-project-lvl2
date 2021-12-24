#!/usr/bin/env node

import program from 'commander';
import diff from '../src/formatters/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(diff(filepath1, filepath2, program.opts().format));
  })
  .parse(process.argv);

export default program;
