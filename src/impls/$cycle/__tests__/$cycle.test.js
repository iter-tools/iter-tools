import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $cycle, $slice } from '@iter-tools/es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`cycle`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($cycle(null)))).toEqual([]);
        expect($await($unwrap($cycle(undefined)))).toEqual([]);
        expect($await($unwrap($cycle([])))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'yields those values repeatedly forever',
      $async(() => {
        expect($await($unwrap($slice(0, 7, $cycle($wrap([1, 2, 3])))))).toEqual([
          1,
          2,
          3,
          1,
          2,
          3,
          1,
        ]);
      }),
    );
  });
});
