#!/usr/bin/env node
import genDiff from '../src/index.js';
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
