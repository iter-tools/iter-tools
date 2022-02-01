/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$starts-with-any.test.ts#1643837503102
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncStartsWithAny } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

describe('asyncStartsWithAny', () => {
  describe('when no values are given', () => {
    it('returns false', async () => {
      expect(await asyncStartsWithAny([], asyncWrap([]))).toBe(false);
    });
  });

  describe('when iterable starts with a given value', () => {
    it('returns true', async () => {
      expect(await asyncStartsWithAny([1], asyncWrap([1, 2, 3]))).toBe(true);
      expect(await asyncStartsWithAny([2, 1], asyncWrap([1, 2, 3]))).toBe(true);
    });
  });

  describe('when iterable does not start with with a given value', () => {
    it('returns false', async () => {
      expect(await asyncStartsWithAny([2], asyncWrap([1, 2, 3]))).toBe(false);
    });
  });

  describe('when iterable is empty', () => {
    it('returns false', async () => {
      expect(await asyncStartsWithAny([null], asyncWrap([]))).toBe(false);
    });
  });

  describe('when same function is specified', () => {
    const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);
    it('uses same value to do comparison', async () => {
      expect(await asyncStartsWithAny(same, [-1], asyncWrap([1, 2, 3]))).toBe(true);
      expect(await asyncStartsWithAny(() => false, [1], asyncWrap([1, 2, 3]))).toBe(false);
    });
  });
});
