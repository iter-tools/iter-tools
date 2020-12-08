import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $splitAt } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`splitAt`, () => {
  describe('with positive index', () => {
    it(
      'works when the halves are consumed in order',
      $async(() => {
        const [first, second] = $splitAt(3, $wrap([0, 1, 2, 3, 4, 5]));
        expect($await($unwrapDeep([first, second]))).toEqual([
          [0, 1, 2],
          [3, 4, 5],
        ]);
      }),
    );

    it(
      'works when the source is exhuasted while the first half is being consumed',
      $async(() => {
        const [first, second] = $splitAt(3, $wrap([0, 1]));
        expect($await($unwrapDeep([first, second]))).toEqual([[0, 1], []]);
      }),
    );

    it(
      'works when the source is exhuasted while the second half is being consumed',
      $async(() => {
        const [first, second] = $splitAt(3, $wrap([0, 1, 2, 3]));
        expect($await($unwrapDeep([first, second]))).toEqual([[0, 1, 2], [3]]);
      }),
    );
  });

  describe('with negative index', () => {
    it(
      'works when the halves are consumed in order',
      $async(() => {
        const [first, second] = $splitAt(-3, $wrap([0, 1, 2, 3, 4, 5]));
        expect($await($unwrapDeep([first, second]))).toEqual([
          [0, 1, 2],
          [3, 4, 5],
        ]);
      }),
    );

    it(
      'all values are in the first part when |index| is larger than source size',
      $async(() => {
        const [first, second] = $splitAt(-3, $wrap([0, 1]));
        expect($await($unwrapDeep([first, second]))).toEqual([[0, 1], []]);
      }),
    );
  });
});
