import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const parser = (filePath) => {
  const fileFormats = ['.json', '.yaml', '.yml'];
  let result;
  if (!fileFormats.includes(path.extname(filePath))) {
    result = 'Wrong file format';
    console.log(result);
    return result;
  }
  if (!fs.existsSync(filePath)) {
    result = 'File(s) is not exist';
    console.log(result);
    return result;
  }
  if (path.extname(filePath) === '.json') {
    result = JSON.parse(fs.readFileSync(filePath));
  }
  if (path.extname(filePath) === '.yaml' || path.extname(filePath) === '.yml') {
    result = yaml.load(fs.readFileSync(filePath));
  }
  return result;
};

export default parser;
