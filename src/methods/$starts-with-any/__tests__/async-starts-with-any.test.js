/**
 * @generated-from ./$starts-with-any.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates */

import { asyncStartsWithAny, range } from '../../..';
describe('asyncStartsWithAny', () => {
  it('returns true if the iterable starts with any of the given values', async () => {
    expect(await asyncStartsWithAny([0, 1], range(1, 10))).toBe(true);
  });
  it('returns true if the iterable starts with all of the given values', async () => {
    expect(await asyncStartsWithAny([1, 1], range(1, 10))).toBe(true);
  });
  it('returns false if the iterable contains but does not start with any of the given values', async () => {
    expect(await asyncStartsWithAny([1], range(0, 10))).toBe(false);
  });
  it('returns false if the iterable does not contain any of given values', async () => {
    expect(await asyncStartsWithAny([1, 3, 4], [2])).toBe(false);
  });
  it('returns false if the iterable is empty', async () => {
    expect(await asyncStartsWithAny([undefined], [])).toBe(false);
  });
});