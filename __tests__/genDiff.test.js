import genDiff from '../src/index.js';
import { expect } from '@jest/globals';

const result = (`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);

test('genDiff - json', () => {
    expect(genDiff('file1.json', 'file2.json')).toBe(result);
});

test('genDiff - yaml', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toBe(result);
});
