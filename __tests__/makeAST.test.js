import makeAST from '../src/makeAST.js';

const object = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { key: 'value', doge: { wow: '' } },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345, deep: { id: 45 } },
};

const result = [
  {
    name: 'common',
    prefix: ' -',
    children: [{ name: 'setting1', prefix: ' -', children: 'Value 1' },
      { name: 'setting2', prefix: ' -', children: 200 },
      { name: 'setting3', prefix: ' -', children: true },
      {
        name: 'setting6',
        prefix: ' -',
        children: [{ name: 'key', prefix: ' -', children: 'value' },
          { name: 'doge', prefix: ' -', children: [{ name: 'wow', prefix: ' -', children: '' }] }],
      }],
  },
  {
    name: 'group1',
    prefix: ' -',
    children: [{ name: 'baz', prefix: ' -', children: 'bas' },
      { name: 'foo', prefix: ' -', children: 'bar' },
      { name: 'nest', prefix: ' -', children: [{ name: 'key', prefix: ' -', children: 'value' }] }],
  },
  {
    name: 'group2',
    prefix: ' -',
    children: [{ name: 'abc', prefix: ' -', children: 12345 },
      { name: 'deep', prefix: ' -', children: [{ name: 'id', prefix: ' -', children: 45 }] }],
  },
];

test('AST', () => {
  expect(makeAST(object, ' -')).toEqual(result);
});
