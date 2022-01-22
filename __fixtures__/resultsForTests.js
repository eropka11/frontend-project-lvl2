const resultForParser = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { key: 'value', doge: { wow: '' } },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345, deep: { id: 45 } },
};

const resultForAST = [
  {
    name: 'common',
    prefix: '- ',
    path: 'common',
    children: [{
      name: 'setting1', prefix: '- ', path: 'common.setting1', children: 'Value 1',
    },
    {
      name: 'setting2', prefix: '- ', path: 'common.setting2', children: 200,
    },
    {
      name: 'setting3', prefix: '- ', path: 'common.setting3', children: true,
    },
    {
      name: 'setting6',
      prefix: '- ',
      path: 'common.setting6',
      children: [{
        name: 'key', prefix: '- ', path: 'common.setting6.key', children: 'value',
      },
      {
        name: 'doge',
        prefix: '- ',
        path: 'common.setting6.doge',
        children: [{
          name: 'wow', prefix: '- ', path: 'common.setting6.doge.wow', children: '',
        }],
      }],
    }],
  },
  {
    name: 'group1',
    prefix: '- ',
    path: 'group1',
    children: [{
      name: 'baz', prefix: '- ', path: 'group1.baz', children: 'bas',
    },
    {
      name: 'foo', prefix: '- ', path: 'group1.foo', children: 'bar',
    },
    {
      name: 'nest',
      prefix: '- ',
      path: 'group1.nest',
      children: [{
        name: 'key', prefix: '- ', path: 'group1.nest.key', children: 'value',
      }],
    }],
  },
  {
    name: 'group2',
    prefix: '- ',
    path: 'group2',
    children: [{
      name: 'abc', prefix: '- ', path: 'group2.abc', children: 12345,
    },
    {
      name: 'deep',
      prefix: '- ',
      path: 'group2.deep',
      children: [{
        name: 'id', prefix: '- ', path: 'group2.deep.id', children: 45,
      }],
    }],
  },
];

const resultForDiff = [
  {
    name: 'common',
    prefix: '  ',
    path: 'common',
    children: [
      {
        name: 'follow', prefix: '+ ', path: 'common.follow', children: false,
      },
      {
        name: 'setting1', prefix: '  ', path: 'common.setting1', children: 'Value 1',
      },
      {
        name: 'setting2', prefix: '- ', path: 'common.setting2', children: 200,
      },
      {
        name: 'setting3', prefix: '- ', path: 'common.setting3', children: true,
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
          name: 'key5', prefix: '  ', path: 'common.setting5.key5', children: 'value5',
        }],
      },
      {
        name: 'setting6',
        prefix: '  ',
        path: 'common.setting6',
        children: [{
          name: 'doge',
          prefix: '  ',
          path: 'common.setting6.doge',
          children: [{
            name: 'wow', prefix: '- ', path: 'common.setting6.doge.wow', children: '',
          },
          {
            name: 'wow', prefix: '+ ', path: 'common.setting6.doge.wow', children: 'so much',
          }],
        },
        {
          name: 'key', prefix: '  ', path: 'common.setting6.key', children: 'value',
        },
        {
          name: 'ops', prefix: '+ ', path: 'common.setting6.ops', children: 'vops',
        }],
      },
    ],
  },
  {
    name: 'group1',
    prefix: '  ',
    path: 'group1',
    children: [{
      name: 'baz', prefix: '- ', path: 'group1.baz', children: 'bas',
    },
    {
      name: 'baz', prefix: '+ ', path: 'group1.baz', children: 'bars',
    },
    {
      name: 'foo', prefix: '  ', path: 'group1.foo', children: 'bar',
    },
    {
      name: 'nest',
      prefix: '- ',
      path: 'group1.nest',
      children: [{
        name: 'key', prefix: '  ', path: 'group1.nest.key', children: 'value',
      }],
    },
    {
      name: 'nest', prefix: '+ ', path: 'group1.nest', children: 'str',
    }],
  },
  {
    name: 'group2',
    prefix: '- ',
    path: 'group2',
    children: [{
      name: 'abc', prefix: '  ', path: 'group2.abc', children: 12345,
    },
    {
      name: 'deep',
      prefix: '  ',
      path: 'group2.deep',
      children: [{
        name: 'id', prefix: '  ', path: 'group2.deep.id', children: 45,
      }],
    }],
  },
  {
    name: 'group3',
    prefix: '+ ',
    path: 'group3',
    children: [{
      name: 'deep',
      prefix: '  ',
      path: 'group3.deep',
      children: [{
        name: 'id',
        prefix: '  ',
        path: 'group3.deep.id',
        children: [{
          name: 'number', prefix: '  ', path: 'group3.deep.id.number', children: 45,
        }],
      }],
    },
    {
      name: 'fee', prefix: '  ', path: 'group3.fee', children: 100500,
    }],
  },
];

export {
  resultForParser, resultForAST, resultForDiff,
};
