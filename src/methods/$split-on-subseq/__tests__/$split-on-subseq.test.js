import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $splitOnSubseq, $map, $toArray } from '../../..';

describe($`splitOnSubseq`, () => {
  it(
    'can split on subseqences',
    $async(() => {
      expect(
        $await($toArray($map(group => $toArray(group), $splitOnSubseq([2, 3], [1, 2, 3, 4])))),
      ).toEqual([[1], [4]]);
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
