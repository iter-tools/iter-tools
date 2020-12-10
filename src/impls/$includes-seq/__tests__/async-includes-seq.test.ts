/**
 * @generated-from ./$includes-seq.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIncludesSeq } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

describe('asyncIncludesSeq', () => {
  describe('when iterable includes a given sequence', () => {
    it('returns true', async () => {
      expect(await asyncIncludesSeq(asyncWrap([1, 2]), asyncWrap([1, 2, 3]))).toBe(true);
      expect(await asyncIncludesSeq(asyncWrap([3]), asyncWrap([1, 2, 3]))).toBe(true);
    });
  });

  describe('when iterable is equal to a given sequence', () => {
    it('returns true', async () => {
      expect(await asyncIncludesSeq(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3]))).toBe(true);
    });
  });

  describe('when iterable is shorter than a matching sequence', () => {
    it('returns false', async () => {
      expect(await asyncIncludesSeq(asyncWrap([1, 2, 3]), asyncWrap([1, 2]))).toBe(false);
    });
  });

  describe('when iterable is empty', () => {
    describe('and sequence is empty', () => {
      it('returns true', async () => {
        expect(await asyncIncludesSeq(asyncWrap([]), asyncWrap([]))).toBe(true);
      });
    });

    describe('and sequence is not empty', () => {
      it('returns false', async () => {
        expect(await asyncIncludesSeq(asyncWrap([undefined]), asyncWrap([]))).toBe(false);
      });
    });
  });

  describe('when same function is specified', () => {
    const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);
    it('uses same value to do comparison', async () => {
      expect(await asyncIncludesSeq(same, asyncWrap([-2]), asyncWrap([1, 2, 3]))).toBe(true);
      expect(await asyncIncludesSeq(() => false, asyncWrap([2]), asyncWrap([1, 2, 3]))).toBe(false);
    });
  });
});
