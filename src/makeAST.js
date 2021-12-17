import _ from 'lodash';

const makeAST = (file, prefix, parent) => {
  const keys = Object.keys(file);
  const result = keys.map((key) => {
    const element = {};
    element.name = key;
    element.prefix = prefix;
    if (parent !== '') {
      element.path = `${parent}.${key}`;
    } else {
      element.path = key;
    }
    if (_.isPlainObject(file[key])) {
      element.children = (makeAST(file[key], prefix, element.path));
    }
    if (!_.isPlainObject(file[key])) {
      element.children = file[key];
    }
    return element;
  });
  return result;
};

export default makeAST;
