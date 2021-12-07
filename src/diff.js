const diff = (tree1, tree2) => {
  const names1 = tree1.map((element) => element.name);
  const names2 = tree2.map((element) => element.name);
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
  const result = tree1.flatMap((currentElement) => {
    if (!names2.includes(currentElement.name)) {
      const correctedCurrentElement = { ...currentElement };
      correctedCurrentElement.children = prefixCorrecter(currentElement.children);
      return correctedCurrentElement;
    }
    const element = {};
    element.name = currentElement.name;
    element.prefix = '  ';
    const child1 = currentElement.children;
    const filtred = tree2.filter((element2) => Object.is(element2.name, currentElement.name))[0];
    const child2 = filtred.children;
    if (Array.isArray(child1) && Array.isArray(child2)) {
      element.children = diff(child1, child2);
      return element;
    }
    if (child1 === child2) {
      element.children = child1;
    }
    if (filtred.name === currentElement.name && child1 !== child2) {
      element.prefix = '- ';
      element.children = prefixCorrecter(child1);
      const element2 = {};
      element2.name = element.name;
      element2.prefix = '+ ';
      element2.children = prefixCorrecter(child2);
      return [element, element2];
    }
    return element;
  });
  tree2.map((element) => {
    if (!names1.includes(element.name)) {
      if (Array.isArray(element.children)) {
        const newChild = prefixCorrecter(element.children);
        const correctedElement = { ...element };
        correctedElement.children = newChild;
        result.push(correctedElement);
      } else {
        result.push(element);
      }
    }
    return element;
  });
  const compare = (a, b) => {
    if (Array.isArray(a.children)) {
      a.children.sort(compare);
    }
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.prefix === '- ') {
      return 1;
    }
    return 0;
  };
  result.sort(compare);
  return result;
};

export default diff;
