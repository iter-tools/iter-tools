import { $async, $await } from '../../../../generate/async.macro';
import { $wrap, $toArray } from '../../..';

describe($async`wrap`, () => {
  it(
    'returns an empty iterable when passed null or undefined',
    $async(() => {
      expect($await($toArray($wrap(undefined)))).toEqual([]);
      expect($await($toArray($wrap(null)))).toEqual([]);
    }),
  );

  it(
    'yields the same elements as its input iterable',
    $async(() => {
      expect($await($toArray($wrap([1, 2, 3])))).toEqual([1, 2, 3]);
    }),
  );

  it(
    'yields the same elements as its input iterable',
    $async(() => {
      expect($await($toArray($wrap([1, 2, 3])))).toEqual([1, 2, 3]);
    }),
  );

  it(
    'can be consumed multiple times if its input can',
    $async(() => {
      const wrapped = $wrap([1, 2, 3]);
      expect($await($toArray(wrapped))).toEqual([1, 2, 3]);
      expect($await($toArray(wrapped))).toEqual([1, 2, 3]);
    }),
  );

  it(
    'can be consumed as an iterator',
    $async(() => {
      const wrapped = $wrap([1, 2, 3]);
      expect($await(wrapped.next())).toEqual({ value: 1, done: false });
      expect($await(wrapped.next())).toEqual({ value: 2, done: false });
      expect($await(wrapped.next())).toEqual({ value: 3, done: false });
      expect($await(wrapped.next())).toEqual({ value: undefined, done: true });
    }),
  );
});
