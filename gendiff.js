#!/usr/bin/env node

const { program } = require('commander');

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2, options) => {
    // функция для сравнения файлов
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ gendiff --help');
    console.log('  $ gendiff -h');
  });

program.parse(process.argv);
