import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $batch } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`batch`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrapDeep($batch(2, null)))).toEqual([]);
        expect($await($unwrapDeep($batch(2, undefined)))).toEqual([]);
        expect($await($unwrapDeep($batch(2, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has fewer than `size` values', () => {
    it(
      'yields one incomplete batch',
      $async(() => {
        expect($await($unwrapDeep($batch(2, $wrap([1]))))).toEqual([[1]]);
      }),
    );
  });

  describe('when source has more than `size` values', () => {
    describe('which can be divided evenly into batches', () => {
      it(
        'yields batches of `size` values',
        $async(() => {
          expect($await($unwrapDeep($batch(2, $wrap([1, 2, 3, 4, 5, 6]))))).toEqual([
            [1, 2],
            [3, 4],
            [5, 6],
          ]);
        }),
      );
    });

    describe('which cannot be divided evenly into batches', () => {
      it(
        'yields batches of `size` values and one incomplete batch',
        $async(() => {
          expect($await($unwrapDeep($batch(2, $wrap([1, 2, 3, 4, 5]))))).toEqual([
            [1, 2],
            [3, 4],
            [5],
          ]);
        }),
      );
    });
  });

  it(
    'errors when passed size <= 0',
    $async(() => {
      expect(() => $batch(0, [])).toThrowErrorMatchingSnapshot();
    }),
  );
});
