import plain from '../src/formatters/plain';
import { resultForDiff, resultForPlain } from '../__fixtures__/resultsForTests';

test('plain', () => {
  expect(plain(resultForDiff)).toEqual(resultForPlain);
});
