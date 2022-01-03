import _ from 'lodash';

const isInArray = (elementToCheck, array) => {
  const eName = elementToCheck.name;
  const ePrefix = elementToCheck.prefix;
  const result = array.filter((element) => element.name === eName && element.prefix !== ePrefix);
  if (result.length === 0) {
    return false;
  }
  return true;
};

const json = (diff) => {
  const result = diff.reduce((acc, element) => {
    const elementName = element.name;
    if (!isInArray(element, diff)) {
      if (Array.isArray(element.children)) {
        const elementToReturn = {
          prefix: element.prefix, path: element.path, children: json(element.children),
        };
        return _.assign(acc, { [elementName]: elementToReturn });
      }
      const elementToReturn = {
        prefix: element.prefix, path: element.path, children: element.children,
      };
      return _.assign(acc, { [elementName]: elementToReturn });
    }
    if (element.prefix === '- ') {
      if (Array.isArray(element.children)) {
        const elementToReturn = {
          before: { prefix: element.prefix, path: element.path, children: json(element.children) },
        };
        return _.assign(acc, { [elementName]: elementToReturn });
      }
      const elementToReturn = {
        before: { prefix: element.prefix, path: element.path, children: element.children },
      };
      return _.assign(acc, { [elementName]: elementToReturn });
    }
    if (Array.isArray(element.children)) {
      const elementToReturn = {
        after: { prefix: element.prefix, path: element.path, children: json(element.children) },
      };
      return _.assign(acc[elementName], elementToReturn);
    }
    const elementToReturn = {
      after: { prefix: element.prefix, path: element.path, children: element.children },
    };
    _.assign(acc[elementName], elementToReturn);
    return acc;
  }, {});
  return result;
};

export default json;
