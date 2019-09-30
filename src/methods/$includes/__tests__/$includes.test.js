import { $, $async, $await } from '../../../../generate/async.macro';

import { $includes, range } from '../../..';

describe($`includes`, () => {
  it(
    'returns true if the iterable contains the given value',
    $async(() => {
      expect($await($includes(1, range(0, 10)))).toBe(true);
    }),
  );

  it(
    'returns true if the iterable contains only the given value',
    $async(() => {
      expect($await($includes(1, [1]))).toBe(true);
    }),
  );

  it(
    'returns false if the iterable does not contain the given value',
    $async(() => {
      expect($await($includes(1, [2]))).toBe(false);
    }),
  );

  it(
    'returns false if the iterable is empty',
    $async(() => {
      expect($await($includes(undefined, []))).toBe(false);
    }),
  );
});
