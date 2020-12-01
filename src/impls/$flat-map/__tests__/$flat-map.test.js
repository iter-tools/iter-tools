import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $flatMap } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`flatMap`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($flatMap((value: any) => value, null)))).toEqual([]);
        expect($await($unwrap($flatMap((value: any) => value, undefined)))).toEqual([]);
        expect($await($unwrap($flatMap((value: any) => value, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'concatenates result of func(value, i) for each value in source',
      $async(() => {
        const iter = $flatMap((value: number, i: number) => [i, value], $wrap([1, 2, 3]));
        expect($await($unwrap(iter))).toEqual([0, 1, 1, 2, 2, 3]);
      }),
    );
  });
});
