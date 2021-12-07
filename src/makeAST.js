import _ from 'lodash';

const makeAST = (file, prefix) => {
  const keys = Object.keys(file);
  const result = keys.map((key) => {
    const element = {};
    element.name = key;
    element.prefix = prefix;
    if (_.isPlainObject(file[key])) {
      element.children = (makeAST(file[key], prefix));
    }
    if (!_.isPlainObject(file[key])) {
      element.children = file[key];
    }
    return element;
  });
  return result;
};

export default makeAST;
