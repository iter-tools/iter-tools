/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$interleave.test.ts#1643837503074
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { AsyncIterable } from '../../../types/async-iterable.js';
import { asyncInterleave, AsyncPeekerator } from 'iter-tools-es';
import { asyncWrap, asyncUnwrap, asyncUnwrapDeep } from '../../../test/async-helpers.js';

const asyncRoundRobinStrategy = async function* (
  options: Record<string, any>,
  all: AsyncPeekerator<AsyncPeekerator<number>>,
  a: AsyncPeekerator<number>,
  b: AsyncPeekerator<number>,
  c: AsyncPeekerator<number>,
) {
  while (!all.done) {
    if (!a.done) {
      yield a.value;
      await a.advance();
    }
    if (!b.done) {
      yield b.value;
      await b.advance();
    }
    if (!c.done) {
      yield c.value;
      await c.advance();
    }
  }
};

const asyncRoundRobin = asyncInterleave(asyncRoundRobinStrategy, {});

describe('asyncInterleave', () => {
  describe('when there are only empty sources', () => {
    it('yields no values', async () => {
      expect(await asyncUnwrap(asyncRoundRobin(null, undefined, []))).toEqual([]);
    });
  });

  describe('when all sources are the same size', () => {
    it('yields all values collated', async () => {
      const sources = [asyncWrap([1, 2, 3]), asyncWrap([4, 5, 6]), asyncWrap([7, 8, 9])];
      expect(await asyncUnwrap(asyncRoundRobin(...sources))).toEqual([1, 4, 7, 2, 5, 8, 3, 6, 9]);
    });
  });

  describe('when sources are different sizes', () => {
    it('yields all values collated', async () => {
      const sources = [asyncWrap([]), asyncWrap([1, 2, 3]), asyncWrap([4])];
      expect(await asyncUnwrap(asyncRoundRobin(...sources))).toEqual([1, 4, 2, 3]);
    });
  });

  describe('when the interleave generator does not yield all values', () => {
    it('closes the source iterables', async () => {
      const asyncIncompleteInterleave = asyncInterleave(async function* () {});

      expect(
        await asyncUnwrap(asyncIncompleteInterleave(asyncWrap([1, 2, 3]), asyncWrap([4, 5, 6]))),
      ).toEqual([]);
    });
  });

  describe('when the interleave is terminated abruptly', () => {
    // eslint-disable-next-line jest/expect-expect
    it('calls return on the strategy', async () => {
      const iter = asyncInterleave(
        // @ts-ignore
        (...args) => asyncWrap(asyncRoundRobinStrategy(...args)),
        {},
        asyncWrap([1, 2, 3]),
        asyncWrap([4, 5, 6]),
      );
      await iter.next();
      await iter.next();
      await iter.return();
    });
  });

  it('can be passed options for the generator', async () => {
    const options = {};

    expect.assertions(1);
    await asyncUnwrap(
      asyncInterleave(
        async function* (o: Record<string, any>): AsyncIterable<any> {
          expect(o).toBe(options);
        },
        options,
        null,
      ),
    );
  });

  describe('the summary', () => {
    it('summary.value is a buffer', async () => {
      const asyncConcat = asyncInterleave(async function* (
        _: Record<string, any>,
        all: AsyncPeekerator<AsyncPeekerator<number>>,
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
          await buffer.advance();
          first = false;
        }
      });

      expect(
        await asyncUnwrapDeep(asyncConcat(asyncWrap([1]), asyncWrap([2]), asyncWrap([3]))),
      ).toEqual([
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
