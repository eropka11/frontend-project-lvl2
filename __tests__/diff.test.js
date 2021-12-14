import diff from '../src/diff.js';
import { resultForDiff, resultForAST, ASTtoCompare } from '../__fixtures__/resultsForTests';

test('diff', () => {
  expect(diff(resultForAST, ASTtoCompare)).toEqual(resultForDiff);
});
