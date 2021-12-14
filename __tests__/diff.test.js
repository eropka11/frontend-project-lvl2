import diff from '../src/diff.js';

const AST1 = [
  {
    name: 'common',
    prefix: '- ',
    children: [{ name: 'setting1', prefix: '- ', children: 'Value 1' },
      { name: 'setting2', prefix: '- ', children: 200 },
      { name: 'setting3', prefix: '- ', children: true },
      {
        name: 'setting6',
        prefix: '- ',
        children: [{ name: 'key', prefix: '- ', children: 'value' },
          { name: 'doge', prefix: '- ', children: [{ name: 'wow', prefix: '- ', children: '' }] }],
      }],
  },
  {
    name: 'group1',
    prefix: '- ',
    children: [{ name: 'baz', prefix: '- ', children: 'bas' },
      { name: 'foo', prefix: '- ', children: 'bar' },
      { name: 'nest', prefix: '- ', children: [{ name: 'key', prefix: '- ', children: 'value' }] }],
  },
  {
    name: 'group2',
    prefix: '- ',
    children: [{ name: 'abc', prefix: '- ', children: 12345 },
      { name: 'deep', prefix: '- ', children: [{ name: 'id', prefix: '- ', children: 45 }] }],
  },
];

const AST2 = [
  {
    name: 'common',
    prefix: '+ ',
    children: [{ name: 'follow', prefix: '+ ', children: false },
      { name: 'setting1', prefix: '+ ', children: 'Value 1' },
      { name: 'setting3', prefix: '+ ', children: null },
      { name: 'setting4', prefix: '+ ', children: 'blah blah' },
      { name: 'setting5', prefix: '+ ', children: [{ name: 'key5', prefix: '+ ', children: 'value5' }] },
      {
        name: 'setting6',
        prefix: '+ ',
        children: [{ name: 'key', prefix: '+ ', children: 'value' },
          { name: 'ops', prefix: '+ ', children: 'vops' },
          { name: 'doge', prefix: '+ ', children: [{ name: 'wow', prefix: '+ ', children: 'so much' }] }],
      }],
  },
  {
    name: 'group1',
    prefix: '+ ',
    children: [{ name: 'foo', prefix: '+ ', children: 'bar' },
      { name: 'baz', prefix: '+ ', children: 'bars' },
      { name: 'nest', prefix: '+ ', children: 'str' }],
  },
  {
    name: 'group3',
    prefix: '+ ',
    children: [{ name: 'deep', prefix: '+ ', children: [{ name: 'id', prefix: '+ ', children: [{ name: 'number', prefix: '+ ', children: 45 }] }] },
      { name: 'fee', prefix: '+ ', children: 100500 }],
  },
];

const result = [
  {
    name: 'common',
    prefix: '  ',
    children: [
      { name: 'follow', prefix: '+ ', children: false },
      { name: 'setting1', prefix: '  ', children: 'Value 1' },
      { name: 'setting2', prefix: '- ', children: 200 },
      { name: 'setting3', prefix: '- ', children: true },
      { name: 'setting3', prefix: '+ ', children: null },
      { name: 'setting4', prefix: '+ ', children: 'blah blah' },
      { name: 'setting5', prefix: '+ ', children: [{ name: 'key5', prefix: '  ', children: 'value5' }] },
      {
        name: 'setting6',
        prefix: '  ',
        children: [{
          name: 'doge',
          prefix: '  ',
          children: [{ name: 'wow', prefix: '- ', children: '' },
            { name: 'wow', prefix: '+ ', children: 'so much' }],
        },
        { name: 'key', prefix: '  ', children: 'value' },
        { name: 'ops', prefix: '+ ', children: 'vops' }],
      },
    ],
  },
  {
    name: 'group1',
    prefix: '  ',
    children: [{ name: 'baz', prefix: '- ', children: 'bas' },
      { name: 'baz', prefix: '+ ', children: 'bars' },
      { name: 'foo', prefix: '  ', children: 'bar' },
      { name: 'nest', prefix: '- ', children: [{ name: 'key', prefix: '  ', children: 'value' }] },
      { name: 'nest', prefix: '+ ', children: 'str' }],
  },
  {
    name: 'group2',
    prefix: '- ',
    children: [{ name: 'abc', prefix: '  ', children: 12345 },
      { name: 'deep', prefix: '  ', children: [{ name: 'id', prefix: '  ', children: 45 }] }],
  },
  {
    name: 'group3',
    prefix: '+ ',
    children: [{ name: 'deep', prefix: '  ', children: [{ name: 'id', prefix: '  ', children: [{ name: 'number', prefix: '  ', children: 45 }] }] },
      { name: 'fee', prefix: '  ', children: 100500 }],
  },
];

test('diff', () => {
  expect(diff(AST1, AST2)).toEqual(result);
});
