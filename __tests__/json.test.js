import json from '../src/formatters/json';
import { resultForDiff } from '../__fixtures__/resultsForTests';

const result = {
  common: {
    prefix: '  ',
    path: 'common',
    children: {
      follow: { prefix: '+ ', path: 'common.follow', children: false },
      setting1: { prefix: '  ', path: 'common.setting1', children: 'Value 1' },
      setting2: { prefix: '- ', path: 'common.setting2', children: 200 },
      setting3: {
        before: { prefix: '- ', path: 'common.setting3', children: true },
        after: { prefix: '+ ', path: 'common.setting3', children: null },
      },
      setting4: { prefix: '+ ', path: 'common.setting4', children: 'blah blah' },
      setting5: {
        prefix: '+ ',
        path: 'common.setting5',
        children: {
          key5: { prefix: '  ', path: 'common.setting5.key5', children: 'value5' },
        },
      },
      setting6: {
        prefix: '  ',
        path: 'common.setting6',
        children: {
          doge: {
            prefix: '  ',
            path: 'common.setting6.doge',
            children: {
              wow: {
                before: { prefix: '- ', path: 'common.setting6.doge.wow', children: '' },
                after: { prefix: '+ ', path: 'common.setting6.doge.wow', children: 'so much' },
              },
            },
          },
          key: { prefix: '  ', path: 'common.setting6.key', children: 'value' },
          ops: { prefix: '+ ', path: 'common.setting6.ops', children: 'vops' },
        },
      },
    },
  },
  group1: {
    prefix: '  ',
    path: 'group1',
    children: {
      baz: {
        before: { prefix: '- ', path: 'group1.baz', children: 'bas' },
        after: { prefix: '+ ', path: 'group1.baz', children: 'bars' },
      },
      foo: { prefix: '  ', path: 'group1.foo', children: 'bar' },
      nest: {
        before: {
          prefix: '- ',
          path: 'group1.nest',
          children: {
            key: { prefix: '  ', path: 'group1.nest.key', children: 'value' },
          },
        },
        after: { prefix: '+ ', path: 'group1.nest', children: 'str' },
      },
    },
  },
  group2: {
    prefix: '- ',
    path: 'group2',
    children: {
      abc: { prefix: '  ', path: 'group2.abc', children: 12345 },
      deep: {
        prefix: '  ',
        path: 'group2.deep',
        children: {
          id: { prefix: '  ', path: 'group2.deep.id', children: 45 },
        },
      },
    },
  },
  group3: {
    prefix: '+ ',
    path: 'group3',
    children: {
      deep: {
        prefix: '  ',
        path: 'group3.deep',
        children: {
          id: {
            prefix: '  ',
            path: 'group3.deep.id',
            children: {
              number: { prefix: '  ', path: 'group3.deep.id.number', children: 45 },
            },
          },
        },
      },
      fee: { prefix: '  ', path: 'group3.fee', children: 100500 },
    },
  },
};
test('json', () => {
  console.log(JSON.stringify(result));
  expect(JSON.stringify(json(resultForDiff))).toEqual(JSON.stringify(result));
});
