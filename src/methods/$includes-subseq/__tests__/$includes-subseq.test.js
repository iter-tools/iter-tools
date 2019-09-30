import { $, $async, $await } from '../../../../generate/async.macro';

import { $includesSubseq, range } from '../../..';

describe($`includesSubseq`, () => {
  it(
    'returns true if the iterable contains the given subsequence',
    $async(() => {
      expect($await($includesSubseq([1, 2], range(0, 10)))).toBe(true);
    }),
  );

  it(
    'returns true if the iterable equals given subsequence',
    $async(() => {
      expect($await($includesSubseq(range(1, 3), range(1, 3)))).toBe(true);
    }),
  );

  it(
    'returns true if the given subsequence is empty',
    $async(() => {
      expect($await($includesSubseq([], range(1, 3)))).toBe(true);
    }),
  );

  it(
    'returns false if subsequence is longer than the iterable',
    $async(() => {
      expect($await($includesSubseq(range(1, 4), range(1, 3)))).toBe(false);
    }),
  );

  describe('when the iterable is empty', () => {
    it(
      'returns true if the subsequence is empty',
      $async(() => {
        expect($await($includesSubseq([], []))).toBe(true);
      }),
    );

    it(
      'returns false if the subsequence is not empty',
      $async(() => {
        expect($await($includesSubseq([undefined], []))).toBe(false);
      }),
    );
  });
});
