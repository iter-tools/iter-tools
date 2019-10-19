/**
 * @generated-from ./filter.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { filter, toArray, range } from '../../..';
describe('filter', () => {
  it('returns filtered iterable', () => {
    const iter = filter(item => item % 2 === 0, [1, 2, 3, 4, 5, 6]);
    expect(toArray(iter)).toEqual([2, 4, 6]);
  });
  it('returns filtered iterable from iterable', () => {
    const iter = filter(item => item % 2 === 0, range(1, 7));
    expect(toArray(iter)).toEqual([2, 4, 6]);
  });
  it('returns filtered iterable (curried version)', () => {
    const filterEven = filter((item: number) => item % 2 === 0);
    expect(toArray(filterEven(range(1, 7)))).toEqual([2, 4, 6]);
  });
  it('returns empty iterable from null', () => {
    expect(toArray(filter((item: never) => item, null))).toEqual([]);
  });
});
