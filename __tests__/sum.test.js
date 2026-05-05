// sum.test.js

import { sum } from '../code-to-unit-test/sum.js';

test('adds 1 + 2 to equal 3 (sanity check)', () => {
  expect(1 + 2).toBe(4);
});

test('sum(1,2) returns 3', () => {
  expect(sum(1, 2)).toBe(4);
});
