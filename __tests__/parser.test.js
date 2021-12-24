import parse from '../src/parser.js';
import { resultForParser } from '../__fixtures__/resultsForTests';

test('parse', () => {
  expect(parse('file.txt')).toEqual('Wrong file format');
  expect(parse('./notTheRealFile.json')).toEqual('File(s) is not exist');
  expect(parse('./__fixtures__/file1.json')).toEqual(resultForParser);
  expect(parse('./__fixtures__/file1.yml')).toEqual(resultForParser);
});
