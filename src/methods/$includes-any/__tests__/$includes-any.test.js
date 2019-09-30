import { $, $async, $await } from '../../../../generate/async.macro';

import { $includesAny, range } from '../../..';

describe($`includesAny`, () => {
  it(
    'returns true if the iterable starts with any of the given values',
    $async(() => {
      expect($await($includesAny([0, 1], range(1, 10)))).toBe(true);
    }),
  );

  it(
    'returns true if the iterable starts with all of the given values',
    $async(() => {
      expect($await($includesAny([1, 1], range(1, 10)))).toBe(true);
    }),
  );

  it(
    'returns true if the iterable contains any of the given values',
    $async(() => {
      expect($await($includesAny([1], range(0, 10)))).toBe(true);
    }),
  );

  it(
    'returns false if the iterable does not contain any of given values',
    $async(() => {
      expect($await($includesAny([1, 3, 4], [2]))).toBe(false);
    }),
  );

  it(
    'returns false if the iterable is empty',
    $async(() => {
      expect($await($includesAny([undefined], []))).toBe(false);
    }),
  );
});
