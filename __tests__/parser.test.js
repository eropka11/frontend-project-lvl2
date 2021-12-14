import parse from '../src/parser.js';

const result = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { key: 'value', doge: { wow: '' } },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345, deep: { id: 45 } },
};

test('parse', () => {
  expect(parse('file.txt')).toEqual('Wrong file format');
  expect(parse('./notTheRealFile.json')).toEqual('File(s) is not exist');
  expect(parse('./__fixtures__/file1.json')).toEqual(result);
  expect(parse('./__fixtures__/file3.yml')).toEqual(result);
});
