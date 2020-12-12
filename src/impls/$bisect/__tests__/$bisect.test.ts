import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $bisect } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`bisect`, () => {
  describe('when there are no values', () => {
    it(
      'yields empty parts',
      $async(() => {
        const [first, second] = $bisect(0, $wrap([]));
        expect($await($unwrapDeep([first, second]))).toEqual([[], []]);
      }),
    );
  });

  describe('when as is a number', () => {
    describe('>= 0', () => {
      it(
        'works when the halves are consumed in order',
        $async(() => {
          const [first, second] = $bisect(3, $wrap([0, 1, 2, 3, 4, 5]));
          expect($await($unwrapDeep([first, second]))).toEqual([
            [0, 1, 2],
            [3, 4, 5],
          ]);
        }),
      );

      it(
        'works when the source is exhuasted while the first half is being consumed',
        $async(() => {
          const [first, second] = $bisect(3, $wrap([0, 1]));
          expect($await($unwrapDeep([first, second]))).toEqual([[0, 1], []]);
        }),
      );

      it(
        'works when the source is exhuasted while the second half is being consumed',
        $async(() => {
          const [first, second] = $bisect(3, $wrap([0, 1, 2, 3]));
          expect($await($unwrapDeep([first, second]))).toEqual([[0, 1, 2], [3]]);
        }),
      );
    });

    describe('< 0', () => {
      it(
        'works when the halves are consumed in order',
        $async(() => {
          const [first, second] = $bisect(-3, $wrap([0, 1, 2, 3, 4, 5]));
          expect($await($unwrapDeep([first, second]))).toEqual([
            [0, 1, 2],
            [3, 4, 5],
          ]);
        }),
      );

      it(
        'all values are in the first part when |index| is larger than source size',
        $async(() => {
          const [first, second] = $bisect(-3, $wrap([0, 1]));
          expect($await($unwrapDeep([first, second]))).toEqual([[0, 1], []]);
        }),
      );
    });
  });

  describe('when as is a function', () => {
    describe('when `as(value, i)` goes from falsy to truthy', () => {
      it(
        'puts values in each part',
        $async(() => {
          const [first, second] = $bisect((_, i) => i > 0, $wrap([1, 2, 3]));
          expect($await($unwrapDeep([first, second]))).toEqual([[1], [2, 3]]);
        }),
      );
    });

    describe('when `as(value, i)` is truthy initially', () => {
      it(
        'puts all the values in the second part',
        $async(() => {
          const [first, second] = $bisect((v) => v > 0, $wrap([1, 2, 3]));
          expect($await($unwrapDeep([first, second]))).toEqual([[], [1, 2, 3]]);
        }),
      );
    });

    describe('when `as(value, i)` is never truthy', () => {
      it(
        'puts all the values in the first part',
        $async(() => {
          const [first, second] = $bisect((_) => null, $wrap([1, 2, 3]));
          expect($await($unwrapDeep([first, second]))).toEqual([[1, 2, 3], []]);
        }),
      );
    });
  });
});
