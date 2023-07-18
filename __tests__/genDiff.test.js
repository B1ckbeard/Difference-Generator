import * as fs from 'node:fs';
import { expect } from '@jest/globals';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__/', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFixture('stylishResult.txt');
const plainResult = readFixture('plainResult.txt');
const jsonResult = readFixture('jsonResult.txt');

test('genDiff - stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(stylishResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish')).toBe(stylishResult);
});

test('genDiff - plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(plainResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain')).toBe(plainResult);
});

test('genDiff - json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(jsonResult);
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json')).toBe(jsonResult);
});
