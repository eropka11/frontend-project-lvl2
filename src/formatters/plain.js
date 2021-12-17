const childFormater = (element) => {
  if (Array.isArray(element)) {
    return '[complex value]';
  }
  if (typeof element === 'string') {
    return `'${element}'`;
  }
  return element;
};

const isInArray = (child, parent) => {
  const cName = child.name;
  const cPrefix = child.prefix;
  const result = parent.filter((element) => element.name === cName && element.prefix !== cPrefix);
  if (result.length === 0) {
    return 'addIt';
  }
  return result[0].children;
};

const plain = (diff) => {
  const result = diff.map((element) => {
    if (element.prefix === '- ' && isInArray(element, diff) === 'addIt') {
      return `Property '${element.path}' was removed`;
    }
    if (element.prefix === '+ ' && isInArray(element, diff) === 'addIt') {
      return `Property '${element.path}' was added with value: ${childFormater(element.children)}`;
    }
    if (element.prefix === '  ' && Array.isArray(element.children)) {
      return plain(element.children);
    }
    if (element.prefix === '+ ' && isInArray(element, diff) !== 'addIt') {
      const childToUpdate = isInArray(element, diff);
      return `Property '${element.path}' was updated. From ${childFormater(childToUpdate)} to ${childFormater(element.children)}`;
    }
    return [];
  });
  return result.flat(2).join('\n');
};

export default plain;
