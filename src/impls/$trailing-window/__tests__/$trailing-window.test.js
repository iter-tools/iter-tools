import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $trailingWindow } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`trailingWindow`, () => {
  describe('when source is empty', () => {
    it(
      'yields no windows',
      $async(() => {
        expect($await($unwrapDeep($trailingWindow(3, { filler: 0 }, null)))).toEqual([]);
        expect($await($unwrapDeep($trailingWindow(3, { filler: 0 }, undefined)))).toEqual([]);
        expect($await($unwrapDeep($trailingWindow(3, { filler: 0 }, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when size(source) < size', () => {
    it(
      'yields only partial windows',
      $async(() => {
        expect($await($unwrapDeep($trailingWindow(3, { filler: 0 }, $wrap([1, 2]))))).toEqual([
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
        expect($await($unwrapDeep($trailingWindow(3, { filler: 0 }, $wrap([1, 2, 3]))))).toEqual([
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

        expect($await($unwrapDeep($trailingWindow(2, { filler: 0 }, $wrap([1, 2, 3]))))).toEqual(
          result,
        );
        // prettier-ignore
        // @ts-ignore
        expect($await($unwrapDeep($trailingWindow({ size: 2, filler: 0 }, $wrap([1, 2, 3]))))).toEqual(result);
      }),
    );
  });

  it(
    'has a default filler of undefined',
    $async(() => {
      expect($await($unwrapDeep($trailingWindow(2, $wrap([1]))))).toEqual([[undefined, 1]]);
    }),
  );
});
