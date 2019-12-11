import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $splitOnSubseq, $toArray } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`splitOnSubseq`, () => {
  it(
    'can split on subseqences',
    $async(() => {
      expect($await($uw($splitOnSubseq([2, 3], $wrap([1, 2, 3, 4]))))).toEqual([[1], [4]]);
    }),
  );

  it(
    'can split on subseqences',
    $async(() => {
      expect($await($uw($splitOnSubseq([3, 4, undefined], $wrap([1, 2, 3, 4]))))).toEqual([
        [1, 2, 3, 4],
      ]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($toArray($splitOnSubseq([], null)))).toEqual([]);
    }),
  );

  it(
    'passes through the empty string',
    $async(() => {
      expect($await($toArray($splitOnSubseq(' ', '')))).toEqual([]);
    }),
  );

  if ($isSync) {
    describe('given a string', () => {
      it('should split on every item which is equal to the on argument', () => {
        expect($toArray($splitOnSubseq('Ø', '11Ø22Ø33'))).toEqual(['11', '22', '33']);
      });
    });
  }
});
