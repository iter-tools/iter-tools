/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$bisect.test.ts#1643837503046
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncBisect } from 'iter-tools-es';
import { asyncWrap, asyncUnwrapDeep } from '../../../test/async-helpers.js';

describe('asyncBisect', () => {
  describe('when there are no values', () => {
    it('yields empty parts', async () => {
      const [first, second] = asyncBisect(0, asyncWrap([]));
      expect(await asyncUnwrapDeep([first, second])).toEqual([[], []]);
    });
  });

  describe('when as is a number', () => {
    describe('>= 0', () => {
      it('works when the halves are consumed in order', async () => {
        const [first, second] = asyncBisect(3, asyncWrap([0, 1, 2, 3, 4, 5]));
        expect(await asyncUnwrapDeep([first, second])).toEqual([
          [0, 1, 2],
          [3, 4, 5],
        ]);
      });

      it('works when the source is exhuasted while the first half is being consumed', async () => {
        const [first, second] = asyncBisect(3, asyncWrap([0, 1]));
        expect(await asyncUnwrapDeep([first, second])).toEqual([[0, 1], []]);
      });

      it('works when the source is exhuasted while the second half is being consumed', async () => {
        const [first, second] = asyncBisect(3, asyncWrap([0, 1, 2, 3]));
        expect(await asyncUnwrapDeep([first, second])).toEqual([[0, 1, 2], [3]]);
      });
    });

    describe('< 0', () => {
      it('works when the halves are consumed in order', async () => {
        const [first, second] = asyncBisect(-3, asyncWrap([0, 1, 2, 3, 4, 5]));
        expect(await asyncUnwrapDeep([first, second])).toEqual([
          [0, 1, 2],
          [3, 4, 5],
        ]);
      });

      it('all values are in the first part when |index| is larger than source size', async () => {
        const [first, second] = asyncBisect(-3, asyncWrap([0, 1]));
        expect(await asyncUnwrapDeep([first, second])).toEqual([[0, 1], []]);
      });
    });
  });

  describe('when as is a function', () => {
    describe('when `as(value, i)` goes from falsy to truthy', () => {
      it('puts values in each part', async () => {
        const [first, second] = asyncBisect((_, i) => i > 0, asyncWrap([1, 2, 3]));
        expect(await asyncUnwrapDeep([first, second])).toEqual([[1], [2, 3]]);
      });
    });

    describe('when `as(value, i)` is truthy initially', () => {
      it('puts all the values in the second part', async () => {
        const [first, second] = asyncBisect((v) => v > 0, asyncWrap([1, 2, 3]));
        expect(await asyncUnwrapDeep([first, second])).toEqual([[], [1, 2, 3]]);
      });
    });

    describe('when `as(value, i)` is never truthy', () => {
      it('puts all the values in the first part', async () => {
        const [first, second] = asyncBisect((_) => null, asyncWrap([1, 2, 3]));
        expect(await asyncUnwrapDeep([first, second])).toEqual([[1, 2, 3], []]);
      });
    });
  });
});
