import json from '../src/formatters/json';
import { resultForDiff, resultForJSON } from '../__fixtures__/resultsForTests';

test('json', () => {
  console.log(JSON.stringify(resultForJSON));
  expect(JSON.stringify(json(resultForDiff))).toEqual(JSON.stringify(resultForJSON));
});
