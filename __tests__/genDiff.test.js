import * as fs from 'node:fs';
import { expect } from '@jest/globals';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__/', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFixture('stylishResult.txt');
const plainResult = readFixture('plainResult.txt');
const jsonResult = readFixture('jsonResult.txt');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYaml1 = getFixturePath('file1.yaml');
const fileYaml2 = getFixturePath('file2.yml');

test('genDiff - stylish', () => {
  expect(genDiff(fileJson1, fileJson2, 'stylish')).toBe(stylishResult);
  expect(genDiff(fileYaml1, fileYaml2, 'stylish')).toBe(stylishResult);
});

test('genDiff - plain', () => {
  expect(genDiff(fileJson1, fileJson2, 'plain')).toBe(plainResult);
  expect(genDiff(fileYaml1, fileYaml2, 'plain')).toBe(plainResult);
});

test('genDiff - json', () => {
  expect(genDiff(fileJson1, fileJson2, 'json')).toBe(jsonResult);
  expect(genDiff(fileYaml1, fileYaml2, 'json')).toBe(jsonResult);
});
