/* eslint-disable no-sequences */
import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $Iterable } from '../../../types/$iterable.js';
import { $interleave, $Peekerator } from 'iter-tools-es';
import { $wrap, $unwrap, $unwrapDeep, anyType } from '../../../test/$helpers.js';

const $roundRobinStrategy = $async(function* (
  options: Record<string, any>,
  all: $Peekerator<$Peekerator<number>>,
  a: $Peekerator<number>,
  b: $Peekerator<number>,
  c: $Peekerator<number>,
) {
  while (!all.done) {
    if (!a.done) {
      yield a.value;
      $await(a.advance());
    }
    if (!b.done) {
      yield b.value;
      $await(b.advance());
    }
    if (!c.done) {
      yield c.value;
      $await(c.advance());
    }
  }
});

const $roundRobin = $interleave($roundRobinStrategy, {});

describe($`interleave`, () => {
  describe('when there are only empty sources', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($roundRobin(null, undefined, [])))).toEqual([]);
      }),
    );
  });

  describe('when all sources are the same size', () => {
    it(
      'yields all values collated',
      $async(() => {
        const sources = [$wrap([1, 2, 3]), $wrap([4, 5, 6]), $wrap([7, 8, 9])];
        const expected = [1, 4, 7, 2, 5, 8, 3, 6, 9];
        expect($await($unwrap($roundRobin(...sources)))).toEqual(expected);
      }),
    );
  });

  describe('when sources are different sizes', () => {
    it(
      'yields all values collated',
      $async(() => {
        const sources = [$wrap([]), $wrap([1, 2, 3]), $wrap([4])];
        const expected = [1, 4, 2, 3];
        expect($await($unwrap($roundRobin(...sources)))).toEqual(expected);
      }),
    );
  });

  describe('when the interleave generator does not yield all values', () => {
    it(
      'closes the source iterables',
      $async(() => {
        const $incompleteInterleave = $interleave($async(function* () {}));

        expect($await($unwrap($incompleteInterleave($wrap([1, 2, 3]), $wrap([4, 5, 6]))))).toEqual(
          [],
        );
      }),
    );
  });

  describe('when the interleave is terminated abruptly', () => {
    // eslint-disable-next-line jest/expect-expect
    it(
      'calls return on the strategy',
      $async(() => {
        const iter = $interleave(
          (...args: any) => $wrap(anyType($roundRobinStrategy)(...args)),
          {},
          $wrap([1, 2, 3]),
          $wrap([4, 5, 6]),
        );
        $await(iter.next());
        $await(iter.next());
        $await(iter.return());
      }),
    );
  });

  it(
    'can be passed options for the generator',
    $async(() => {
      const options = {};

      expect.assertions(1);
      $await(
        $unwrap(
          $interleave(
            $async(function* (o: Record<string, any>): $Iterable<any> {
              expect(o).toBe(options);
            }),
            options,
            null,
          ),
        ),
      );
    }),
  );

  describe('the summary', () => {
    it(
      'summary.value is a buffer',
      $async(() => {
        const $concat = $interleave(
          $async(function* (_: Record<string, any>, all: $Peekerator<$Peekerator<number>>) {
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
              $await(buffer.advance());
              first = false;
            }
          }),
        );

        const expected = [
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
        ];
        expect($await($unwrapDeep($concat($wrap([1]), $wrap([2]), $wrap([3]))))).toEqual(expected);
      }),
    );
  });
});
