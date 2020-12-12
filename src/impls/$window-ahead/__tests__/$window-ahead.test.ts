import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $windowAhead } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`windowAhead`, () => {
  describe('when source is empty', () => {
    it(
      'yields no windows',
      $async(() => {
        expect($await($unwrapDeep($windowAhead({ filler: 0 }, 3, null)))).toEqual([]);
        expect($await($unwrapDeep($windowAhead({ filler: 0 }, 3, undefined)))).toEqual([]);
        expect($await($unwrapDeep($windowAhead({ filler: 0 }, 3, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when size(source) < size', () => {
    it(
      'yields only partial windows',
      $async(() => {
        expect($await($unwrapDeep($windowAhead({ filler: 0 }, 3, $wrap([1, 2]))))).toEqual([
          [1, 2, 0],
          [2, 0, 0],
        ]);
      }),
    );
  });

  describe('when size(source) === size', () => {
    it(
      'yields one full window, then partial windows',
      $async(() => {
        expect($await($unwrapDeep($windowAhead({ filler: 0 }, 3, $wrap([1, 2, 3]))))).toEqual([
          [1, 2, 3],
          [2, 3, 0],
          [3, 0, 0],
        ]);
      }),
    );
  });

  describe('when size(source) > size', () => {
    it(
      'yields size(source)-size full windows, then partial windows',
      $async(() => {
        const result = [
          [1, 2],
          [2, 3],
          [3, 0],
        ];

        expect($await($unwrapDeep($windowAhead({ filler: 0 }, 2, $wrap([1, 2, 3]))))).toEqual(
          result,
        );
      }),
    );
  });

  describe('when useFiller is false', () => {
    it(
      'yields shorter windows instead of windows with filler',
      $async(() => {
        expect(
          $await($unwrapDeep($windowAhead({ useFiller: false }, 3, $wrap([1, 2, 3])))),
        ).toEqual([[1, 2, 3], [2, 3], [3]]);
      }),
    );
  });

  it(
    'has a default filler of undefined',
    $async(() => {
      expect($await($unwrapDeep($windowAhead(2, $wrap([1]))))).toEqual([[1, undefined]]);
    }),
  );

  describe('when arguments are invalid', () => {
    it(
      'throws',
      $async(() => {
        expect(() => $windowAhead('foo' as any, $wrap([1, 2, 3]))).toThrowErrorMatchingSnapshot();
      }),
    );
  });
});
