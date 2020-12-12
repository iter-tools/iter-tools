import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $windowBehind } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`windowBehind`, () => {
  describe('when source is empty', () => {
    it(
      'yields no windows',
      $async(() => {
        expect($await($unwrapDeep($windowBehind({ filler: 0 }, 3, null)))).toEqual([]);
        expect($await($unwrapDeep($windowBehind({ filler: 0 }, 3, undefined)))).toEqual([]);
        expect($await($unwrapDeep($windowBehind({ filler: 0 }, 3, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when size(source) < size', () => {
    it(
      'yields only partial windows',
      $async(() => {
        expect($await($unwrapDeep($windowBehind({ filler: 0 }, 3, $wrap([1, 2]))))).toEqual([
          [0, 0, 1],
          [0, 1, 2],
        ]);
      }),
    );
  });

  describe('when size(source) === size', () => {
    it(
      'yields partial windows, then one full window',
      $async(() => {
        expect($await($unwrapDeep($windowBehind({ filler: 0 }, 3, $wrap([1, 2, 3]))))).toEqual([
          [0, 0, 1],
          [0, 1, 2],
          [1, 2, 3],
        ]);
      }),
    );
  });

  describe('when size(source) > size', () => {
    it(
      'yields partial windows, then size(source)-size full windows',
      $async(() => {
        const result = [
          [0, 1],
          [1, 2],
          [2, 3],
        ];

        expect($await($unwrapDeep($windowBehind({ filler: 0 }, 2, $wrap([1, 2, 3]))))).toEqual(
          result,
        );
      }),
    );
  });

  it(
    'has a default filler of undefined',
    $async(() => {
      expect($await($unwrapDeep($windowBehind(2, $wrap([1]))))).toEqual([[undefined, 1]]);
    }),
  );

  describe('when arguments are invalid', () => {
    it(
      'throws',
      $async(() => {
        expect(() => $windowBehind('foo' as any, $wrap([1, 2, 3]))).toThrowErrorMatchingSnapshot();
      }),
    );
  });
});
