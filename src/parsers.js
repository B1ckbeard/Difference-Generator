import yaml from 'js-yaml';

const parse = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    try {
      return yaml.load(data);
    } catch (error) {
      throw new Error('Unable to parse data');
    }
  }
};

export default parse;
