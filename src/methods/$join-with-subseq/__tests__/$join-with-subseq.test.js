import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $joinWithSubseq, $toArray } from '../../..';

describe($`joinWithSubseq`, () => {
  describe('joining on the empty subseq', () => {
    it(
      'should include the items from every group',
      $async(() => {
        expect($await($toArray($joinWithSubseq([], [[1], [2], [3]])))).toEqual([1, 2, 3]);
      }),
    );

    it(
      'should contain no output for an empty group',
      $async(() => {
        expect($await($toArray($joinWithSubseq([], [[1], [], [3]])))).toEqual([1, 3]);
      }),
    );
  });

  it(
    'should yield a single separator when joining two empty groups',
    $async(() => {
      expect($await($toArray($joinWithSubseq([1, 2], [[], []])))).toEqual([1, 2]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($toArray($joinWithSubseq([], null)))).toEqual([]);
    }),
  );

  if ($isSync) {
    it('passes through the empty string', () => {
      expect($toArray($joinWithSubseq([], ''))).toEqual([]);
    });

    describe('given a string', () => {
      it('should split on every item which is equal to the on argument', () => {
        expect($toArray($joinWithSubseq([], ['11', '22', '33']))).toEqual([
          '1',
          '1',
          '2',
          '2',
          '3',
          '3',
        ]);
      });
    });
  }
});
