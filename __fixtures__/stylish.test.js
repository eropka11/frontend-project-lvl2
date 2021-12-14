import stylish from '../src/stylish.js';

const diff = [
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

const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }`;

test('stylish', () => {
  expect(stylish(diff, 0)).toEqual(result);
});
