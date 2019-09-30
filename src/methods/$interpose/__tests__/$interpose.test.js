import { $, $async, $await } from '../../../../generate/async.macro';

import { $interpose, $toArray, range } from '../../..';

describe($`interpose`, () => {
  it(
    'interposes items into array',
    $async(() => {
      const iter = $interpose(9, [1, 2, 3]);
      expect($await($toArray(iter))).toEqual([1, 9, 2, 9, 3]);
    }),
  );

  it(
    'interposes items into an iterable',
    $async(() => {
      const iter = $interpose(null, range({ start: 1, end: 4 }));
      expect($await($toArray(iter))).toEqual([1, null, 2, null, 3]);
    }),
  );

  it(
    'returns mapped iterable (curried version)',
    $async(() => {
      const iter = $interpose([]);
      expect($await($toArray(iter(range({ start: 1, end: 4 }))))).toEqual([1, [], 2, [], 3]);
    }),
  );

  it(
    'returns empty iterable from null',
    $async(() => {
      expect($await($toArray($interpose('', null)))).toEqual([]);
    }),
  );
});
