/**
 * @generated-from ./map.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { map, toArray, range } from '../../..';

describe('map', () => {
  it('returns mapped iterable', () => {
    const iter = map(item => item * 2, [1, 2, 3]);
    expect(toArray(iter)).toEqual([2, 4, 6]);
  });

  it('returns mapped iterable from iterable', () => {
    const iter = map(item => item * 2, range(1, 4));
    expect(toArray(iter)).toEqual([2, 4, 6]);
  });

  it('returns mapped iterable (curried version)', () => {
    const iter = map((item: number) => item * 2);
    expect(toArray(iter(range(1, 4)))).toEqual([2, 4, 6]);
  });

  it('returns empty iterable from null', () => {
    expect(toArray(map((item: never) => item * 2, null))).toEqual([]);
  });
});
