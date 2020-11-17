import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $joinWithSeq } from '@iter-tools/es';
import { $wrapDeep, $unwrap } from '../../../test/$helpers.js';

describe($`joinWithSeq`, () => {
  describe('joining on the empty seq', () => {
    it(
      'should include the items from every group',
      $async(() => {
        expect($await($unwrap($joinWithSeq([], $wrapDeep([[1], [2], [3]]))))).toEqual([1, 2, 3]);
      }),
    );

    it(
      'should contain no output for an empty group',
      $async(() => {
        expect($await($unwrap($joinWithSeq([], $wrapDeep([[1], [], [3]]))))).toEqual([1, 3]);
      }),
    );
  });

  it(
    'should yield a single separator when joining two empty groups',
    $async(() => {
      expect($await($unwrap($joinWithSeq([1, 2], $wrapDeep([[], []]))))).toEqual([1, 2]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($unwrap($joinWithSeq([], null)))).toEqual([]);
      expect($await($unwrap($joinWithSeq([], undefined)))).toEqual([]);
      expect($await($unwrap($joinWithSeq([], $wrapDeep([]))))).toEqual([]);
    }),
  );
});
