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
  const diffLines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `Property '${getPath(path, node.key).join('.')}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${getPath(path, node.key).join('.')}' was removed`;
      case 'nested':
        return plainDiff(node.children, getPath(path, node.key));
      case 'changed':
        return `Property '${getPath(path, node.key).join('.')}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      default:
        return null;
    }
  });
  return diffLines.filter(Boolean).join('\n');
};

export default plainDiff;