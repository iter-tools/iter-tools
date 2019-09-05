import { $async, $await } from '../../../../generate/async.macro';
import { $startsWith, range } from '../../..';

describe($async`startsWith`, () => {
  it(
    'returns true if the iterable starts with the given value',
    $async(() => {
      expect($await($startsWith(1, range(1, 10)))).toBe(true);
    }),
  );

  it(
    'returns false if the iterable contains but does not start with the given value',
    $async(() => {
      expect($await($startsWith(1, range(0, 10)))).toBe(false);
    }),
  );

  it(
    'returns true if the iterable contains only the given value',
    $async(() => {
      expect($await($startsWith(1, [1]))).toBe(true);
    }),
  );

  it(
    'returns false if the iterable is empty',
    $async(() => {
      expect($await($startsWith(undefined, []))).toBe(false);
    }),
  );
});
