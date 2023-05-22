import * as fs from 'node:fs';
import _ from 'lodash';
import * as process from 'process';
import path from 'node:path';
import yaml from 'js-yaml';
import parser from './parsers';

//функция для определения формата файла(JSON/yaml)
const getFileFormat = (filePath) => path.extname(filePath).replace('.', '');

const getData = (filePath) => parser(fs.readFileSync(path.resolve(process.cwd(),'../frontend-project-46','__fixtures__',filePath), 'utf-8'), getFileFormat(filePath));

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const sortedKeys = _.union(_.keys(data1), _.keys(data2)).sort();
  
  const result = ['{'];

  for (const key of sortedKeys) {
    if (data1[key] === data2[key]) {
      result.push(`    ${key}: ${data1[key]}`);
    } else {
      if (Object.prototype.hasOwnProperty.call(data1,key)) {
        result.push(`  - ${key}: ${data1[key]}`);
      }
      if (Object.prototype.hasOwnProperty.call(data2,key)) {
        result.push(`  + ${key}: ${data2[key]}`);
      }
    }
  }

  result.push('}');
  
  return result.join('\n');
};

export default genDiff;
