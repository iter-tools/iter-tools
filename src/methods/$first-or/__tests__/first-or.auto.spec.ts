/**
 * @generated-from ./first-or.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { firstOr } from '../../..';
import { wrap } from '../../../__tests__/__framework__/wrap';

describe('firstOr', () => {
  describe('when iterable is empty', () => {
    it('returns whenEmpty', () => {
      expect(firstOr(0, null)).toBe(0);
      expect(firstOr(0, undefined)).toBe(0);
      expect(firstOr(0, wrap([]))).toBe(0);
    });
  });

  describe('when iterable contains values', () => {
    it('returns first value', () => {
      expect(firstOr(null, wrap([1, 2, 3]))).toBe(1);
    });
  });
});
