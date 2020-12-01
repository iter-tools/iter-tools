import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $drop } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`drop`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($drop(0, null)))).toEqual([]);
        expect($await($unwrap($drop(0, undefined)))).toEqual([]);
        expect($await($unwrap($drop(0, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when n is smaller than size(source)', () => {
    it(
      'drops the first n values and yields the rest',
      $async(() => {
        expect($await($unwrap($drop(1, $wrap([1, 2, 3]))))).toEqual([2, 3]);
      }),
    );
  });

  describe('when n is larger than size(source)', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($drop(4, $wrap([1, 2, 3]))))).toEqual([]);
      }),
    );
  });
});
