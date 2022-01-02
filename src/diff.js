import _ from 'lodash';

const makeElement = (elementName, prefix, path, children) => {
  const element = {
    name: elementName, prefix, path, children,
  };
  return element;
};

const prefixCorrecter = (children) => {
  if (Array.isArray(children)) {
    const correctedChildren = children.map((child) => {
      const correctedChild = { ...child };
      correctedChild.prefix = '  ';
      correctedChild.children = prefixCorrecter(correctedChild.children);
      return correctedChild;
    });
    return correctedChildren;
  }
  return children;
};
const diff = (tree1, tree2) => {
  const names1 = tree1.map((element) => element.name);
  const names2 = tree2.map((element) => element.name);
  const result1 = tree1.flatMap((currentElement) => {
    if (!names2.includes(currentElement.name)) {
      const correctedCurrentElement = { ...currentElement };
      correctedCurrentElement.children = prefixCorrecter(currentElement.children);
      return correctedCurrentElement;
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
    if (!names1.includes(element.name)) {
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
