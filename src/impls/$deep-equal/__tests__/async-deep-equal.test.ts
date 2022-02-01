/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$deep-equal.test.ts#1643837503053
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncDeepEqual, __asyncDeepEqual } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

describe('asyncDeepEqual', () => {
  describe('when there is only one iterable', () => {
    it('returns true', async () => {
      expect(await asyncDeepEqual(null)).toBe(true);
      expect(await asyncDeepEqual(undefined)).toBe(true);
      expect(await asyncDeepEqual(asyncWrap([1, 2, 3]))).toBe(true);
    });
  });

  describe('when all values are equal', () => {
    it('returns true', async () => {
      expect(await asyncDeepEqual(4, 4, 4)).toBe(true);
      expect(await asyncDeepEqual(NaN, NaN, NaN)).toBe(true);
    });
  });

  describe('when all values in all iterables are equal', () => {
    it('returns true', async () => {
      expect(await asyncDeepEqual(asyncWrap([]), asyncWrap([]))).toBe(true);
      expect(await asyncDeepEqual(null, undefined)).toBe(true);
      expect(await asyncDeepEqual(null, undefined, asyncWrap([]))).toBe(true);
      expect(await asyncDeepEqual(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3]))).toBe(true);
      expect(
        await asyncDeepEqual(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3])),
      ).toBe(true);
    });
  });

  describe('when all values in some iterables are equal', () => {
    it('returns false', async () => {
      expect(
        await asyncDeepEqual(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3]), asyncWrap([1, 2, 4])),
      ).toBe(false);
      expect(
        await asyncDeepEqual(asyncWrap([1, 2, 3]), asyncWrap([1, 2, 4]), asyncWrap([1, 2, 3])),
      ).toBe(false);
      expect(
        await asyncDeepEqual(asyncWrap([1, 2, 4]), asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3])),
      ).toBe(false);
    });
  });

  describe('when iterables have the same values but different lengths', () => {
    it('returns false', async () => {
      expect(await asyncDeepEqual(asyncWrap([1]), asyncWrap([1]), asyncWrap([1, 2]))).toBe(false);
      expect(await asyncDeepEqual(asyncWrap([1]), asyncWrap([1, 2]), asyncWrap([1]))).toBe(false);
      expect(await asyncDeepEqual(asyncWrap([1, 2]), asyncWrap([1]), asyncWrap([1]))).toBe(false);
      expect(await asyncDeepEqual(asyncWrap([]), asyncWrap([]), asyncWrap([1]))).toBe(false);
      expect(await asyncDeepEqual(asyncWrap([]), asyncWrap([1]), asyncWrap([]))).toBe(false);
      expect(await asyncDeepEqual(asyncWrap([1]), asyncWrap([]), asyncWrap([]))).toBe(false);
    });
  });
});

describe('async__deepEqual', () => {
  const same = (a: number, b: number) => Math.abs(a) === Math.abs(b);

  it('uses same value to do comparison', async () => {
    expect(await __asyncDeepEqual([asyncWrap([-1, -2, -3]), asyncWrap([1, 2, 3])], same)).toBe(
      true,
    );
    expect(await __asyncDeepEqual([asyncWrap([1, 2, 3]), asyncWrap([1, 2, 3])], () => false)).toBe(
      false,
    );

    expect(
      await __asyncDeepEqual(
        [
          asyncWrap([1, asyncWrap([2, asyncWrap([3])])]),
          asyncWrap([1, asyncWrap([2, asyncWrap([4])])]),
        ],
        (a: number, b: number, depth: number) => (depth > 1 ? true : Object.is(a, b)),
      ),
    ).toBe(true);
  });

  describe('when coerceNil is false', () => {
    it('can', async () => {
      expect(await __asyncDeepEqual([null, undefined], Object.is, false)).toBe(false);
      expect(await __asyncDeepEqual([null, asyncWrap([])], Object.is, false)).toBe(false);
    });
  });
});
