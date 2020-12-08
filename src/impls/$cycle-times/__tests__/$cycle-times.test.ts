import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $cycleTimes } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`cycleTimes`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($cycleTimes(1, null)))).toEqual([]);
        expect($await($unwrap($cycleTimes(1, undefined)))).toEqual([]);
        expect($await($unwrap($cycleTimes(1, [])))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'yields those values repeating n times',
      $async(() => {
        expect($await($unwrap($cycleTimes(2, $wrap([1, 2, 3]))))).toEqual([1, 2, 3, 1, 2, 3]);
      }),
    );
  });
});
