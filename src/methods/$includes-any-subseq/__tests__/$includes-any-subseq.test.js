import { $, $async, $await } from '../../../../generate/async.macro';

import { $includesAnySubseq, range } from '../../..';

describe($`includesAnySubseq`, () => {
  it(
    'returns true if the iterable contains any of the given subsequences',
    $async(() => {
      expect($await($includesAnySubseq([[0, 1], [1, 2]], range(0, 10)))).toBe(true);
    }),
  );

  it(
    'returns true if the iterable equals any of the given subsequences',
    $async(() => {
      expect($await($includesAnySubseq([range(0, 2), range(1, 3)], range(1, 3)))).toBe(true);
    }),
  );

  it(
    'returns true if no subsequences are given',
    $async(() => {
      expect($await($includesAnySubseq([], range(1, 3)))).toBe(true);
    }),
  );

  it(
    'returns false if the given subsequences are longer than the iterable',
    $async(() => {
      expect($await($includesAnySubseq([range(0, 3), range(1, 4)], range(1, 3)))).toBe(false);
    }),
  );

  describe('when the iterable is empty', () => {
    it(
      'returns true if any subsequence is empty',
      $async(() => {
        expect($await($includesAnySubseq([[], [null]], []))).toBe(true);
      }),
    );

    it(
      'returns false if all subsequences are not empty',
      $async(() => {
        expect($await($includesAnySubseq([[undefined]], []))).toBe(false);
      }),
    );
  });
});
