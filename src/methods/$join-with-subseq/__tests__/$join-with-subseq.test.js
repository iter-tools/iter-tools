import { $, $async, $await } from '../../../../generate/async.macro';

import { $joinWithSubseq } from '../../..';
import { $wrapDeep, $unwrap } from '../../../test/$helpers';

describe($`joinWithSubseq`, () => {
  describe('joining on the empty subseq', () => {
    it(
      'should include the items from every group',
      $async(() => {
        expect($await($unwrap($joinWithSubseq([], $wrapDeep([[1], [2], [3]]))))).toEqual([1, 2, 3]);
      }),
    );

    it(
      'should contain no output for an empty group',
      $async(() => {
        expect($await($unwrap($joinWithSubseq([], $wrapDeep([[1], [], [3]]))))).toEqual([1, 3]);
      }),
    );
  });

  it(
    'should yield a single separator when joining two empty groups',
    $async(() => {
      expect($await($unwrap($joinWithSubseq([1, 2], $wrapDeep([[], []]))))).toEqual([1, 2]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($unwrap($joinWithSubseq([], null)))).toEqual([]);
      expect($await($unwrap($joinWithSubseq([], undefined)))).toEqual([]);
      expect($await($unwrap($joinWithSubseq([], $wrapDeep([]))))).toEqual([]);
    }),
  );
});
