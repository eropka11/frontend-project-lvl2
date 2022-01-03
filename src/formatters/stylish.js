const spacesCounter = (path) => {
  const arrayedPath = path.split('');
  const result = arrayedPath.filter((letter) => letter === '.').length;
  return result;
};

const stylish = (diff) => {
  const result = diff.reduce((acc, element) => {
    if (Array.isArray(element.children)) {
      const string = ['\n  ', '    '.repeat(spacesCounter(element.path)), element.prefix, element.name, ': ', stylish(element.children)];
      if (string[-1] !== '}') {
        const closedString = ['\n  ', '    '.repeat(spacesCounter(element.path)), element.prefix, element.name, ': ', stylish(element.children), `\n${'    '.repeat(spacesCounter(`.${element.path}`))}}`];
        return acc + closedString.join('');
      }
      return acc + string.join('');
    }
    const string = ['\n  ', '    '.repeat(spacesCounter(element.path)), element.prefix, element.name, `: ${element.children}`];
    return acc + string.join('');
  }, '{');
  return result;
};

export default stylish;
