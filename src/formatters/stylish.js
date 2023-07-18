import _ from 'lodash';

const spacesCount = 4;

const getIndent = (depth) => {
  if (depth < 1) return '';
  return ' '.repeat(spacesCount * depth - 2);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const output = Object.entries(data)
    .map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${output.join('\n')}\n${getIndent(depth)}  }`;
};

const stylishDiff = (diff, depth = 1) => {
  const diffLines = diff.map((
    {
      type, key, value, children, oldValue, newValue,
    },
  ) => {
    switch (type) {
      case 'added':
        return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
      case 'deleted':
        return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`;
      case 'nested':
        return `${getIndent(depth)}  ${key}: {\n${stylishDiff(children, depth + 1)}\n${getIndent(depth)}  }`;
      case 'changed':
        return `${getIndent(depth)}- ${key}: ${stringify(oldValue, depth)}\n${getIndent(depth)}+ ${key}: ${stringify(newValue, depth)}`;
      case 'unchanged':
        return `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`;
      default:
        throw new Error((`Unknown node's type: ${type}`));
    }
  });
  return diffLines.join('\n');
};

export default stylishDiff;
