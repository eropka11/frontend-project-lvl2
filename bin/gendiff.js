#!/usr/bin/env node

import { Command } from 'commander/esm.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');
program.parse(process.argv);

export default genDiff;
