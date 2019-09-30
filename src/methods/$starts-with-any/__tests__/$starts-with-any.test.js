import { $, $async, $await } from '../../../../generate/async.macro';

import { $startsWithAny, range } from '../../..';

describe($`startsWithAny`, () => {
  it(
    'returns true if the iterable starts with any of the given values',
    $async(() => {
      expect($await($startsWithAny([0, 1], range(1, 10)))).toBe(true);
    }),
  );

  it(
    'returns true if the iterable starts with all of the given values',
    $async(() => {
      expect($await($startsWithAny([1, 1], range(1, 10)))).toBe(true);
    }),
  );

  it(
    'returns false if the iterable contains but does not start with any of the given values',
    $async(() => {
      expect($await($startsWithAny([1], range(0, 10)))).toBe(false);
    }),
  );

  it(
    'returns false if the iterable does not contain any of given values',
    $async(() => {
      expect($await($startsWithAny([1, 3, 4], [2]))).toBe(false);
    }),
  );

  it(
    'returns false if the iterable is empty',
    $async(() => {
      expect($await($startsWithAny([undefined], []))).toBe(false);
    }),
  );
});
