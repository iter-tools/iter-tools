import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $splitOnAnySubseq } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`splitOnAnySubseq`, () => {
  it(
    'can split on any of many possible subsequences',
    $async(() => {
      expect($await($uw($splitOnAnySubseq([[2, 2], [3, 3]], $wrap([1, 2, 2, 3, 3, 4]))))).toEqual([
        [1],
        [],
        [4],
      ]);
    }),
  );

  it(
    'works when the separator is the only thing in the sequence',
    $async(() => {
      expect($await($uw($splitOnAnySubseq([[2, 2], [3, 3]], $wrap([2, 2]))))).toEqual([[], []]);
    }),
  );

  it(
    'splits on the longest subsequence that matches',
    $async(() => {
      expect(
        $await($uw($splitOnAnySubseq([[2, 2, 3], [2, 3]], $wrap([1, 2, 2, 3, 3, 4])))),
      ).toEqual([[1], [3, 4]]);

      expect(
        $await($uw($splitOnAnySubseq([[2, 3], [2, 2, 3]], $wrap([1, 2, 2, 3, 3, 4])))),
      ).toEqual([[1], [3, 4]]);

      expect(
        $await($uw($splitOnAnySubseq([[2, 2, 3], [2, 2]], $wrap([1, 2, 2, 3, 3, 4])))),
      ).toEqual([[1], [3, 4]]);

      expect(
        $await($uw($splitOnAnySubseq([[2, 2], [2, 2, 3]], $wrap([1, 2, 2, 3, 3, 4])))),
      ).toEqual([[1], [3, 4]]);
    }),
  );

  it(
    'should only start matching again after a consumed split ends',
    $async(() => {
      expect(
        $await($uw($splitOnAnySubseq([[2, 3], [3, 2]], $wrap([1, 2, 3, 2, 2, 3, 2, 3, 4])))),
      ).toEqual([[1], [2], [], [4]]);

      expect(
        $await($uw($splitOnAnySubseq([[2, 3], [2, 2, 3]], $wrap([1, 2, 2, 3, 3, 4])))),
      ).toEqual([[1], [3, 4]]);
    }),
  );

  it(
    'does not split on the empty subsequence',
    $async(() => {
      expect($await($uw($splitOnAnySubseq([[], [null]], $wrap([1, 2, null, 4]))))).toEqual([
        [1, 2],
        [4],
      ]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($uw($splitOnAnySubseq([], null)))).toEqual([]);
    }),
  );

  it(
    'the empty string is an empty iterable',
    $async(() => {
      expect($await($uw($splitOnAnySubseq([], '')))).toEqual([]);
    }),
  );

  if ($isSync) {
    describe('given a string', () => {
      it('should split on every item which is equal to the on argument', () => {
        expect($uw($splitOnAnySubseq(['Ø'], '11Ø22Ø33'))).toEqual(['11', '22', '33']);
      });

      it('should split when the subseqs are not strings', () => {
        expect($uw($splitOnAnySubseq([['Ø']], '11Ø22Ø33'))).toEqual(['11', '22', '33']);
      });
    });
  }
});
