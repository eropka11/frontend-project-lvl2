import makeAST from '../src/makeAST.js';
import { resultForParser, resultForAST } from '../__fixtures__/resultsForTests';

test('AST', () => {
  expect(makeAST(resultForParser, '- ')).toEqual(resultForAST);
});
