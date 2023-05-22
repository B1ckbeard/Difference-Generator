import yaml from 'js-yaml';

export const parser = (data, fileFormat) => {
    switch (fileFormat) {
      case 'json':
        return JSON.parse(data);
      case 'yaml':
      case 'yml':
        return yaml.load(data);
      default:
        throw new Error(`Unknown format: ${fileFormat}`);
    }
};

export default parser;