import { $, $async, $await } from '../../../../generate/async.macro';

import { $interposeSubseq, $toArray, range } from '../../..';

describe($`interposeSubseq`, () => {
  it(
    'interposes items into array',
    $async(() => {
      const iter = $interposeSubseq([9, 9], [1, 2, 3]);
      expect($await($toArray(iter))).toEqual([1, 9, 9, 2, 9, 9, 3]);
    }),
  );

  it(
    'interposes items into an iterable',
    $async(() => {
      const iter = $interposeSubseq([null], range({ start: 1, end: 4 }));
      expect($await($toArray(iter))).toEqual([1, null, 2, null, 3]);
    }),
  );

  it(
    'returns mapped iterable (curried version)',
    $async(() => {
      const iter = $interposeSubseq([]);
      expect($await($toArray(iter(range({ start: 1, end: 4 }))))).toEqual([1, 2, 3]);
    }),
  );

  it(
    'returns empty iterable from null',
    $async(() => {
      expect($await($toArray($interposeSubseq('', null)))).toEqual([]);
    }),
  );
});
