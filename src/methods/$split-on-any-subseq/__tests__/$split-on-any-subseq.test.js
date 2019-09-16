import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $splitOnAnySubseq, $map, $toArray } from '../../..';

describe($async`splitOnAnySubseq`, () => {
  it(
    'can split on any of many possible subsequences',
    $async(() => {
      expect(
        $await(
          $toArray(
            $map(group => $toArray(group), $splitOnAnySubseq([[2, 2], [3, 3]], [1, 2, 2, 3, 3, 4])),
          ),
        ),
      ).toEqual([[1], [], [4]]);
    }),
  );

  it(
    'splits on the longest subsequence that matches',
    $async(() => {
      expect(
        $await(
          $toArray(
            $map(
              group => $toArray(group),
              $splitOnAnySubseq([[2, 2, 3], [2, 3]], [1, 2, 2, 3, 3, 4]),
            ),
          ),
        ),
      ).toEqual([[1], [3, 4]]);

      expect(
        $await(
          $toArray(
            $map(
              group => $toArray(group),
              $splitOnAnySubseq([[2, 3], [2, 2, 3]], [1, 2, 2, 3, 3, 4]),
            ),
          ),
        ),
      ).toEqual([[1], [3, 4]]);

      expect(
        $await(
          $toArray(
            $map(
              group => $toArray(group),
              $splitOnAnySubseq([[2, 2, 3], [2, 2]], [1, 2, 2, 3, 3, 4]),
            ),
          ),
        ),
      ).toEqual([[1], [3, 4]]);

      expect(
        $await(
          $toArray(
            $map(
              group => $toArray(group),
              $splitOnAnySubseq([[2, 2], [2, 2, 3]], [1, 2, 2, 3, 3, 4]),
            ),
          ),
        ),
      ).toEqual([[1], [3, 4]]);
    }),
  );

  it(
    'should only start matching again after a consumed split ends',
    $async(() => {
      expect(
        $await(
          $toArray(
            $map(
              group => $toArray(group),
              $splitOnAnySubseq([[2, 3], [3, 2]], [1, 2, 3, 2, 2, 3, 2, 3, 4]),
            ),
          ),
        ),
      ).toEqual([[1], [2], [], [4]]);

      expect(
        $await(
          $toArray(
            $map(
              group => $toArray(group),
              $splitOnAnySubseq([[2, 3], [2, 2, 3]], [1, 2, 2, 3, 3, 4]),
            ),
          ),
        ),
      ).toEqual([[1], [3, 4]]);
    }),
  );

  it(
    'does not split on the empty subsequence',
    $async(() => {
      expect(
        $await(
          $toArray(
            $map(group => $toArray(group), $splitOnAnySubseq([[], [null]], [1, 2, null, 4])),
          ),
        ),
      ).toEqual([[1, 2], [4]]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($toArray($splitOnAnySubseq([], null)))).toEqual([]);
    }),
  );

  it(
    'the empty string is an empty iterable',
    $async(() => {
      expect($await($toArray($splitOnAnySubseq([], '')))).toEqual([]);
    }),
  );

  if (!$isAsync) {
    describe('given a string', () => {
      it('should split on every item which is equal to the on argument', () => {
        expect($toArray($splitOnAnySubseq('Ø', '11Ø22Ø33'))).toEqual(['11', '22', '33']);
      });
    });
  }
});
