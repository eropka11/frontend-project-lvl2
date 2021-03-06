import _ from 'lodash';
import { makeElement } from './makeAST.js';

const prefixCorrecter = (children) => {
  if (Array.isArray(children)) {
    return children.map((child) => makeElement(child.name, '  ', child.path, prefixCorrecter(child.children)));
  }
  return children;
};
const diff = (tree1, tree2) => {
  const names = {
    names1: tree1.map((element) => element.name),
    names2: tree2.map((element) => element.name),
  };
  const result1 = tree1.flatMap((currentElement) => {
    if (!names.names2.includes(currentElement.name)) {
      const newChild = prefixCorrecter(currentElement.children);
      return makeElement(currentElement.name, currentElement.prefix, currentElement.path, newChild);
    }
    const child1 = currentElement.children;
    const filtred = tree2.filter((element2) => Object.is(element2.name, currentElement.name))[0];
    const child2 = filtred.children;
    if (Array.isArray(child1) && Array.isArray(child2)) {
      return makeElement(currentElement.name, '  ', currentElement.path, diff(child1, child2));
    }
    if (child1 === child2) {
      return makeElement(currentElement.name, '  ', currentElement.path, child1);
    }
    if (filtred.name === currentElement.name && child1 !== child2) {
      const element = makeElement(currentElement.name, '- ', currentElement.path, prefixCorrecter(child1));
      const element2 = makeElement(currentElement.name, '+ ', currentElement.path, prefixCorrecter(child2));
      return [element, element2];
    }
    return currentElement;
  });
  const result2 = tree2.flatMap((element) => {
    if (!names.names1.includes(element.name)) {
      if (Array.isArray(element.children)) {
        const newChild = prefixCorrecter(element.children);
        return makeElement(element.name, element.prefix, element.path, newChild);
      }
      return element;
    }
    return [];
  });

  const result = result1.concat(result2);
  const sortedResult = _.sortBy(result, 'name');
  return sortedResult;
};

export default diff;
