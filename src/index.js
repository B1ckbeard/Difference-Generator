import * as fs from 'node:fs';
import _ from 'lodash';

import * as process from 'process';
import path from 'node:path';

const genDiff = (filepath1, filepath2) => {
  //функция для определения формата файла(JSON/yaml)
  // const fileFormat = (file) => {return}

  //console.log("Current working directory: ", process.cwd());
  const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(),'../frontend-project-46','__fixtures__',filepath1), 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(),'../frontend-project-46','__fixtures__',filepath2), 'utf-8'));

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
