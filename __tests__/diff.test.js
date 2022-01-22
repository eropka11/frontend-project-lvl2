import diff from '../src/diff.js';
import { resultForDiff, resultForAST } from '../__fixtures__/resultsForTests';

const ASTtoCompare = [
  {
    name: 'common',
    prefix: '+ ',
    path: 'common',
    children: [{
      name: 'follow', prefix: '+ ', path: 'common.follow', children: false,
    },
    {
      name: 'setting1', prefix: '+ ', path: 'common.setting1', children: 'Value 1',
    },
    {
      name: 'setting3', prefix: '+ ', path: 'common.setting3', children: null,
    },
    {
      name: 'setting4', prefix: '+ ', path: 'common.setting4', children: 'blah blah',
    },
    {
      name: 'setting5',
      prefix: '+ ',
      path: 'common.setting5',
      children: [{
        name: 'key5', prefix: '+ ', path: 'common.setting5.key5', children: 'value5',
      }],
    },
    {
      name: 'setting6',
      prefix: '+ ',
      path: 'common.setting6',
      children: [{
        name: 'key', prefix: '+ ', path: 'common.setting6.key', children: 'value',
      },
      {
        name: 'ops', prefix: '+ ', path: 'common.setting6.ops', children: 'vops',
      },
      {
        name: 'doge',
        prefix: '+ ',
        path: 'common.setting6.doge',
        children: [{
          name: 'wow', prefix: '+ ', path: 'common.setting6.doge.wow', children: 'so much',
        }],
      }],
    }],
  },
  {
    name: 'group1',
    prefix: '+ ',
    path: 'group1',
    children: [{
      name: 'foo', prefix: '+ ', path: 'group1.foo', children: 'bar',
    },
    {
      name: 'baz', prefix: '+ ', path: 'group1.baz', children: 'bars',
    },
    {
      name: 'nest', prefix: '+ ', path: 'group1.nest', children: 'str',
    }],
  },
  {
    name: 'group3',
    prefix: '+ ',
    path: 'group3',
    children: [{
      name: 'deep',
      prefix: '+ ',
      path: 'group3.deep',
      children: [{
        name: 'id',
        prefix: '+ ',
        path: 'group3.deep.id',
        children: [{
          name: 'number', prefix: '+ ', path: 'group3.deep.id.number', children: 45,
        }],
      }],
    },
    {
      name: 'fee', prefix: '+ ', path: 'group3.fee', children: 100500,
    }],
  },
];

test('diff', () => {
  expect(diff(resultForAST, ASTtoCompare)).toEqual(resultForDiff);
});
