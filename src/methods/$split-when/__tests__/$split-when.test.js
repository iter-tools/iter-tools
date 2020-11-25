import { $, $async, $await } from '../../../../generate/async.macro';

import { $splitWhen } from '../../..';
import { $wrap, $unwrapDeep } from '../../../test/$helpers';

describe($`splitWhen`, () => {
  describe('when there are no values', () => {
    it(
      'yields empty parts',
      $async(() => {
        const [first, second] = $splitWhen((_, i) => i > 0, $wrap([]));
        expect($await($unwrapDeep([first, second]))).toEqual([[], []]);
      }),
    );
  });

  describe('when `predicate(value, i)` goes from falsy to truthy', () => {
    it(
      'puts values in each part',
      $async(() => {
        const [first, second] = $splitWhen((_, i) => i > 0, $wrap([1, 2, 3]));
        expect($await($unwrapDeep([first, second]))).toEqual([[1], [2, 3]]);
      }),
    );
  });

  describe('when `predicate(value, i)` is truthy initially', () => {
    it(
      'puts all the values in the second part',
      $async(() => {
        const [first, second] = $splitWhen((v) => v > 0, $wrap([1, 2, 3]));
        expect($await($unwrapDeep([first, second]))).toEqual([[], [1, 2, 3]]);
      }),
    );
  });

  describe('when `predicate(value, i)` is never truthy', () => {
    it(
      'puts all the values in the first part',
      $async(() => {
        const [first, second] = $splitWhen((_) => null, $wrap([1, 2, 3]));
        expect($await($unwrapDeep([first, second]))).toEqual([[1, 2, 3], []]);
      }),
    );
  });
});
