import { $, $async, $await } from '../../../../generate/async.macro';

import { $startsWithAnySubseq, range } from '../../..';

describe.skip($`startsWithAnySubseq`, () => {
  it(
    'returns true if the iterable starts with any of the given subsequences',
    $async(() => {
      expect($await($startsWithAnySubseq([[0, 1], [1, 2]], range(0, 10)))).toBe(true);
    }),
  );

  it(
    'returns false if the iterable includes but does not start with any of the given subsequences',
    $async(() => {
      expect($await($startsWithAnySubseq([[1, 2], [2, 3]], range(0, 10)))).toBe(false);
    }),
  );

  it(
    'returns true if the iterable equals any of the given subsequences',
    $async(() => {
      expect($await($startsWithAnySubseq([range(0, 2), range(1, 3)], range(1, 3)))).toBe(true);
    }),
  );

  it(
    'returns true if no subsequences are given',
    $async(() => {
      expect($await($startsWithAnySubseq([], range(1, 3)))).toBe(true);
    }),
  );

  it(
    'returns false if the given subsequences are longer than the iterable',
    $async(() => {
      expect($await($startsWithAnySubseq([range(0, 3), range(1, 4)], range(1, 3)))).toBe(false);
    }),
  );

  describe('when the iterable is empty', () => {
    it(
      'returns true if any subsequence is empty',
      $async(() => {
        expect($await($startsWithAnySubseq([[], [null]], []))).toBe(true);
      }),
    );

    it(
      'returns false if all subsequences are not empty',
      $async(() => {
        expect($await($startsWithAnySubseq([[undefined]], []))).toBe(false);
      }),
    );
  });
});
