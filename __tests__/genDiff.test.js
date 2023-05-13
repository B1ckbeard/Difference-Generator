import genDiff from '../src/index.js';
import path from 'node:path';
import * as fs from 'node:fs';
import test from 'node:test';
import { expect } from 'expect';

// Считываем файлы
const data1 = fs.readFileSync(path.resolve('../frontend-project-46','__fixtures__','file1.json'), 'utf-8');
const data2 = fs.readFileSync(path.resolve('../frontend-project-46','__fixtures__','file2.json'), 'utf-8');

// Проверяем, что файлы не пустые
test('Files should not be empty', () => {
    expect(data1).not.toBe('');
    expect(data2).not.toBe('');
});

// добавить тест для определения формата файла

// Проверяем функцию genDiff
const result = (`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);

test('genDiff', () => {
    expect(genDiff('file1.json', 'file2.json')).toBe(result);
});
