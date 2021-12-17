import stylish from '../src/formatters/stylish.js';
import { resultForDiff, resultForStylish } from '../__fixtures__/resultsForTests';

test('stylish', () => {
  expect(stylish(resultForDiff, 0)).toEqual(resultForStylish);
});
