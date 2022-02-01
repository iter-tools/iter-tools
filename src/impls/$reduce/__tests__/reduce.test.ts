/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$reduce.test.ts#1643837503085
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { reduce } from 'iter-tools-es';
import { wrap } from '../../../test/helpers.js';

describe('reduce', () => {
  describe('when iterable is empty', () => {
    describe('when no initial value specified', () => {
      it('throws', () => {
        const error = (() => {
          try {
            reduce((acc: any, x) => acc + x, wrap([]));
          } catch (e) {
            return e;
          }
        })();

        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatchSnapshot();
      });
    });

    describe('when an initial value is specified', () => {
      it('yields the specified initial value', () => {
        expect(reduce(0, (acc, x) => acc + x, wrap([]))).toBe(0);
      });
    });
  });

  describe('when source has values', () => {
    describe('when no initial value specified', () => {
      it('sums an array', () => {
        expect(reduce((acc, x) => acc + x, wrap([1, 2, 3]))).toBe(6);
      });
    });

    describe('when an initial value is specified', () => {
      it('sums using a specified initial value', () => {
        expect(reduce(0, (acc, x) => acc + x, wrap([1, 2, 3]))).toBe(6);
      });
    });
  });

  describe('when there is an error while reducing', () => {
    // eslint-disable-next-line jest/expect-expect
    it('closes source', () => {
      try {
        reduce(() => {
          throw new Error('Stop the presses!');
        }, wrap([1, 2, 3]));
      } catch (e) {}
    });
  });
});
