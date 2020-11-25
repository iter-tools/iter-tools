import { $, $async, $await } from '../../../../generate/async.macro';

import { $enumerate } from '../../..';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`enumerate`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($enumerate(null)))).toEqual([]);
        expect($await($unwrap($enumerate(undefined)))).toEqual([]);
        expect($await($unwrap($enumerate($wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'yields [i, value] tuples',
      $async(() => {
        expect($await($unwrap($enumerate($wrap([1, 2, 3]))))).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
        expect($await($unwrap($enumerate(3, $wrap([1, 2, 3]))))).toEqual([
          [3, 1],
          [4, 2],
          [5, 3],
        ]);
        expect($await($unwrap($enumerate(-3, $wrap([1, 2, 3]))))).toEqual([
          [-3, 1],
          [-2, 2],
          [-1, 3],
        ]);
      }),
    );
  });
});
