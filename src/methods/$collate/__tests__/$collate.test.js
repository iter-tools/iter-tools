import { $, $async, $await } from '../../../../generate/async.macro';

import { $collate, $toArray } from '../../..';

describe($`collate`, () => {
  it(
    'output is sorted if passed a comparator',
    $async(() => {
      const iter = $collate((a, b) => b - a, [1, 8, 9], [4, 6, 7], [2, 3, 5]);
      expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }),
  );

  it(
    'works with input iterables of different lengths',
    $async(() => {
      const iter = $collate((a, b) => b - a, [], [2, 3], [1]);
      expect($await($toArray(iter))).toEqual([1, 2, 3]);
    }),
  );
});
