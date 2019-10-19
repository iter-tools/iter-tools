/**
 * @generated-from ./$take-while.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { takeWhile, toArray, range } from '../../..';
describe('takeWhile', () => {
  it('takeWhile on array', () => {
    const iter = takeWhile(item => item % 2 === 0, [2, 2, 3, 2, 2, 2]);
    expect(toArray(iter)).toEqual([2, 2]);
  });
  it('takeWhile on iterable', () => {
    const iter = takeWhile(item => item !== 4, range(1, 7));
    expect(toArray(iter)).toEqual([1, 2, 3]);
  });
  it('takeWhile on iterable (curried version)', () => {
    const iter = takeWhile((item: number) => item !== 4);
    expect(toArray(iter(range(1, 7)))).toEqual([1, 2, 3]);
  });
  it('takeWhile on empty iterable', () => {
    expect(toArray(takeWhile((item: never) => item, null))).toEqual([]);
  });
});
