/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$starts-with-seq.test.ts#1643837503103
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncStartsWithSeq } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

describe('asyncStartsWithSeq', () => {
  describe('when iterable starts with the sequence', () => {
    it('returns true', async () => {
      expect(await asyncStartsWithSeq(asyncWrap([1, 2]), asyncWrap([1, 2, 3]))).toBe(true);
    });
  });

  describe('when iterable is equal to the sequence', () => {
    it('returns true', async () => {
      expect(await asyncStartsWithSeq(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3]))).toBe(true);
    });
  });

  describe('when iterable is shorter than the sequence', () => {
    it('returns false', async () => {
      expect(await asyncStartsWithSeq(asyncWrap([1, 2, 3]), asyncWrap([1, 2]))).toBe(false);
    });
  });

  describe('when iterable includes but does not start with the sequence', () => {
    it('returns false', async () => {
      expect(await asyncStartsWithSeq(asyncWrap([2, 3]), asyncWrap([1, 2, 3]))).toBe(false);
    });
  });

  describe('when iterable is empty', () => {
    describe('and the sequence is empty', () => {
      it('returns true', async () => {
        expect(await asyncStartsWithSeq(asyncWrap([]), asyncWrap([]))).toBe(true);
      });
    });

    describe('and the sequence is not empty', () => {
      it('returns false', async () => {
        expect(await asyncStartsWithSeq(asyncWrap([undefined]), asyncWrap([]))).toBe(false);
      });
    });
  });

  describe('when same function is specified', () => {
    const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);
    it('uses same value to do comparison', async () => {
      expect(await asyncStartsWithSeq(same, asyncWrap([-1]), asyncWrap([1, 2, 3]))).toBe(true);
      expect(await asyncStartsWithSeq(() => false, asyncWrap([1]), asyncWrap([1, 2, 3]))).toBe(
        false,
      );
    });
  });
});
