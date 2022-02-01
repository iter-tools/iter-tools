/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$interleave.test.ts#1643837503074
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { Iterable } from '../../../types/iterable.js';
import { interleave, Peekerator } from 'iter-tools-es';
import { wrap, unwrap, unwrapDeep } from '../../../test/helpers.js';

const roundRobinStrategy = function* (
  options: Record<string, any>,
  all: Peekerator<Peekerator<number>>,
  a: Peekerator<number>,
  b: Peekerator<number>,
  c: Peekerator<number>,
) {
  while (!all.done) {
    if (!a.done) {
      yield a.value;
      a.advance();
    }
    if (!b.done) {
      yield b.value;
      b.advance();
    }
    if (!c.done) {
      yield c.value;
      c.advance();
    }
  }
};

const roundRobin = interleave(roundRobinStrategy, {});

describe('interleave', () => {
  describe('when there are only empty sources', () => {
    it('yields no values', () => {
      expect(unwrap(roundRobin(null, undefined, []))).toEqual([]);
    });
  });

  describe('when all sources are the same size', () => {
    it('yields all values collated', () => {
      const sources = [wrap([1, 2, 3]), wrap([4, 5, 6]), wrap([7, 8, 9])];
      expect(unwrap(roundRobin(...sources))).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9]);
    });
  });

  describe('when sources are different sizes', () => {
    it('yields all values collated', () => {
      const sources = [wrap([]), wrap([1, 2, 3]), wrap([4])];
      expect(unwrap(roundRobin(...sources))).toEqual([1, 4, 2, 3]);
    });
  });

  describe('when the interleave generator does not yield all values', () => {
    it('closes the source iterables', () => {
      const incompleteInterleave = interleave(function* () {});

      expect(unwrap(incompleteInterleave(wrap([1, 2, 3]), wrap([4, 5, 6])))).toEqual([]);
    });
  });

  describe('when the interleave is terminated abruptly', () => {
    // eslint-disable-next-line jest/expect-expect
    it('calls return on the strategy', () => {
      const iter = interleave(
        // @ts-ignore
        (...args) => wrap(roundRobinStrategy(...args)),
        {},
        wrap([1, 2, 3]),
        wrap([4, 5, 6]),
      );
      iter.next();
      iter.next();
      iter.return();
    });
  });

  it('can be passed options for the generator', () => {
    const options = {};

    expect.assertions(1);
    unwrap(
      interleave(
        function* (o: Record<string, any>): Iterable<any> {
          expect(o).toBe(options);
        },
        options,
        null,
      ),
    );
  });

  describe('the summary', () => {
    it('summary.value is a buffer', () => {
      const concat = interleave(function* (
        _: Record<string, any>,
        all: Peekerator<Peekerator<number>>,
      ) {
        let first = true;
        while (!all.done) {
          if (first) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(() => all.advance()).toThrowErrorMatchingSnapshot();
          }
          expect(all.current.done).toBe(all.done);
          expect(all.current.value).toBe(all.value);
          const { value: buffer, index } = all;
          yield { value: buffer.value, index };
          buffer.advance();
          first = false;
        }
      });

      expect(unwrapDeep(concat(wrap([1]), wrap([2]), wrap([3])))).toEqual([
        {
          index: 0,
          value: 1,
        },
        {
          index: 1,
          value: 2,
        },
        {
          index: 2,
          value: 3,
        },
      ]);
    });
  });
});
