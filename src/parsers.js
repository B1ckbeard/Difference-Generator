import yaml from 'js-yaml';

const parse = (data) => {
  try {
    return JSON.parse(data);
  } catch (jsonError) {
    try {
      return yaml.load(data);
    } catch (yamlError) {
      throw new Error('Unable to parse data');
    }
  }
};

export default parse;
