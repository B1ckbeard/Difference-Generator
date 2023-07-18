import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const getPath = (path, key) => [...path, key];

const plainDiff = (diff, path = []) => {
  const diffLines = diff.map((
    {
      type, key, value, children, oldValue, newValue,
    },
  ) => {
    switch (type) {
      case 'added':
        return `Property '${getPath(path, key).join('.')}' was added with value: ${stringify(value)}`;
      case 'deleted':
        return `Property '${getPath(path, key).join('.')}' was removed`;
      case 'nested':
        return plainDiff(children, getPath(path, key));
      case 'changed':
        return `Property '${getPath(path, key).join('.')}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      default:
        return null;
    }
  });
  return diffLines.filter(Boolean).join('\n');
};

export default plainDiff;
