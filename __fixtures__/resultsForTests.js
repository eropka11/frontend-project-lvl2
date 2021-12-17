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

const resultForStylish = `{
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

const resultForPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

export {
  resultForParser, resultForAST, ASTtoCompare, resultForDiff, resultForStylish, resultForPlain,
};
