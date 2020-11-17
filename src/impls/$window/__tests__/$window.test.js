import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $window } from '@iter-tools/es';
import { $wrap, $unwrapDeep, anyType } from '../../../test/$helpers.js';

describe($`window`, () => {
  describe('when source is empty', () => {
    it(
      'yields no windows',
      $async(() => {
        expect($await($unwrapDeep($window(3, null)))).toEqual([]);
        expect($await($unwrapDeep($window(3, undefined)))).toEqual([]);
        expect($await($unwrapDeep($window(3, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when size(source) < size', () => {
    it(
      'yields no windows',
      $async(() => {
        expect($await($unwrapDeep($window(3, $wrap([1, 2]))))).toEqual([]);
      }),
    );
  });

  describe('when size(source) === size', () => {
    it(
      'yields one full window',
      $async(() => {
        expect($await($unwrapDeep($window(3, $wrap([1, 2, 3]))))).toEqual([[1, 2, 3]]);
      }),
    );
  });

  describe('when size(source) > size', () => {
    it(
      'yields partial windows, then size(source)-size full windows',
      $async(() => {
        const result = [
          [1, 2],
          [2, 3],
        ];

        expect($await($unwrapDeep($window(2, $wrap([1, 2, 3]))))).toEqual(result);
      }),
    );
  });

  describe('when size is invalid', () => {
    it(
      'throws a validation error',
      $async(() => {
        expect(() => $window(anyType(''), $wrap([]))).toThrowErrorMatchingSnapshot();
      }),
    );
  });
});
