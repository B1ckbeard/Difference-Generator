import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const diff = [];

  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      diff.push({ key, value: data2[key], type: 'added' });
    }
    else if (!_.has(data2, key)) {
      diff.push({ key, value: data1[key], type: 'deleted' });
    }
    else if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      diff.push({ key, children: buildDiff(data1[key], data2[key]), type: 'nested' });
    }
    else if (_.isEqual(data1[key], data2[key])) {
      diff.push({ key, value: data1[key], type: 'unchanged' });
    }
    else {
      diff.push({
      key, oldValue: data1[key], newValue: data2[key], type: 'changed',
    })};
  });
};

export default buildDiff;
