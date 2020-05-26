/**
 * @generated-from ./$includes.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { includes, range } from '../../..';

describe('includes', () => {
  it('returns true if the iterable contains the given value', () => {
    expect(includes(1, range(0, 10))).toBe(true);
  });

  it('returns true if the iterable contains only the given value', () => {
    expect(includes(1, [1])).toBe(true);
  });

  it('returns false if the iterable does not contain the given value', () => {
    expect(includes(1, [2])).toBe(false);
  });

  it('returns false if the iterable is empty', () => {
    expect(includes(undefined, [])).toBe(false);
  });
});
