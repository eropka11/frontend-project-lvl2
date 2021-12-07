const stylish = (diff, i) => {
  const result = diff.reduce((acc, element) => {
    const string = [];
    string.push('\n  ');
    string.push('    '.repeat(i));
    string.push(element.prefix);
    string.push(element.name);
    if (Array.isArray(element.children)) {
      i += 1;
      string.push(': ');
      string.push(stylish(element.children, i));
      if (string[-1] !== '}') {
        string.push(`\n${'    '.repeat(i)}}`);
        i -= 1;
      }
    } else {
      string.push(`: ${element.children}`);
    }
    return acc + string.join('');
  }, '{');
  return result;
};

export default stylish;
