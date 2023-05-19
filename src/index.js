import * as fs from 'node:fs';
import _ from 'lodash';
import * as process from 'process';
import path from 'node:path';
import yaml from 'js-yaml';

//функция для определения формата файла(JSON/yaml)
export const fileFormatParse = (filePath) => {
  const fileFormat = path.extname(filePath).replace('.', '');
  switch (fileFormat) {
    case 'json':
      return JSON.parse(fs.readFileSync(path.resolve(process.cwd(),'../frontend-project-46','__fixtures__',filePath), 'utf-8'));
    case 'yaml':
    case 'yml':
      return yaml.load(fs.readFileSync(path.resolve(process.cwd(),'../frontend-project-46','__fixtures__',filePath), 'utf-8'));
    default:
      throw new Error(`Unknown format: ${fileFormat}`);
  }
};


const genDiff = (filepath1, filepath2) => {
  const data1 = fileFormatParse(filepath1);
  const data2 = fileFormatParse(filepath2);;

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
