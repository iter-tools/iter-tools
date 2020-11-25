/**
 * @generated-from ./find-or.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { findOr } from '../../..';
import { wrap } from '../../../test/helpers';

describe('findOr', () => {
  describe('when iterable is empty', () => {
    it('returns notFoundValue', () => {
      expect(findOr(0, (item: any) => item, null)).toBe(0);
      expect(findOr(0, (item: any) => item, undefined)).toBe(0);
      expect(findOr(0, (item: any) => item, wrap([]))).toBe(0);
    });
  });

  describe('when iterable does not contain the desired value', () => {
    it('returns notFoundValue', () => {
      expect(findOr(0, (_) => false, wrap([1, 2, 3, 4, 5, 6]))).toBe(0);
    });
  });

  describe('when iterable contains the desired value', () => {
    it('returns the value', () => {
      expect(findOr(0, (item) => item === 5, wrap([1, 2, 3, 4, 5, 6]))).toBe(5);
    });
  });
});
