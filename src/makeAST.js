import _ from 'lodash';

const makeElement = (elementName, prefix, path, children) => {
  const element = {
    name: elementName, prefix, path, children,
  };
  return element;
};

const makeAST = (file, prefix, parent) => {
  const keys = Object.keys(file);
  const result = keys.map((key) => {
    if (_.isPlainObject(file[key])) {
      if (parent !== '') {
        return makeElement(key, prefix, `${parent}.${key}`, makeAST(file[key], prefix, `${parent}.${key}`));
      }
      return makeElement(key, prefix, key, makeAST(file[key], prefix, key));
    }
    if (parent !== '') {
      return makeElement(key, prefix, `${parent}.${key}`, file[key]);
    }
    return makeElement(key, prefix, key, file[key]);
  });
  return result;
};

export default makeAST;
export { makeElement };
