import { $, $async, $await } from '../../../../generate/async.macro';

import { $startsWithSubseq, range } from '../../..';

describe.skip($`startsWithSubseq`, () => {
  it(
    'returns true if the iterable starts with the given subsequence',
    $async(() => {
      expect($await($startsWithSubseq([1, 2], range(1, 10)))).toBe(true);
    }),
  );

  it(
    'returns false if the iterable contains but does not start with the given subsequence',
    $async(() => {
      expect($await($startsWithSubseq([1, 2], range(0, 10)))).toBe(false);
    }),
  );

  it(
    'returns true if the iterable equals given subsequence',
    $async(() => {
      expect($await($startsWithSubseq(range(1, 3), range(1, 3)))).toBe(true);
    }),
  );

  it(
    'returns true if the given subsequence is empty',
    $async(() => {
      expect($await($startsWithSubseq(null, range(1, 3)))).toBe(true);
    }),
  );

  it(
    'returns false if subsequence is longer than the iterable',
    $async(() => {
      expect($await($startsWithSubseq(range(1, 4), range(1, 3)))).toBe(false);
    }),
  );

  describe('when the iterable is empty', () => {
    it(
      'returns true if the subsequence is empty',
      $async(() => {
        expect($await($startsWithSubseq([], []))).toBe(true);
      }),
    );

    it(
      'returns false if the subsequence is not empty',
      $async(() => {
        expect($await($startsWithSubseq([undefined], []))).toBe(false);
      }),
    );
  });
});
