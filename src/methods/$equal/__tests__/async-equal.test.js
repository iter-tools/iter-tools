/**
 * @generated-from ./$equal.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates */

import { asyncEqual, asyncWrap } from '../../..';
describe('asyncEqual', () => {
  it('returns true if there is only one iterable', async () => {
    expect(await asyncEqual(asyncWrap([1, 2, 3]))).toEqual(true);
  });
  it('returns true if all contents are equal', async () => {
    expect(
      await asyncEqual(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3])),
    ).toEqual(true);
  });
  it('returns false if any contents are not equal', async () => {
    expect(
      await asyncEqual(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3]), asyncWrap([1, 2, 4])),
    ).toEqual(false);
  });
  it('returns false if any arrays are not the same length', async () => {
    expect(
      await asyncEqual(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3, 4])),
    ).toEqual(false);
  });
});
