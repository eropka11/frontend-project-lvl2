import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const parser = (filePath) => {
  const fileFormats = ['.json', '.yaml', '.yml'];
  if (!fileFormats.includes(path.extname(filePath))) {
    const result = 'Wrong file format';
    console.log(result);
    return result;
  }
  if (!fs.existsSync(filePath)) {
    const result = 'File(s) is not exist';
    console.log(result);
    return result;
  }
  if (path.extname(filePath) === '.json') {
    const result = JSON.parse(fs.readFileSync(filePath));
    return result;
  }
  const result = yaml.load(fs.readFileSync(filePath));
  return result;
};

export default parser;
