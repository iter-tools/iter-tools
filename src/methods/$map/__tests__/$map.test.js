import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $map, asyncMap, $toArray, asyncToArray, range } from '../../..';

describe($`map`, () => {
  it(
    'returns mapped iterable',
    $async(() => {
      const iter = $map(item => item * 2, [1, 2, 3]);
      expect($await($toArray(iter))).toEqual([2, 4, 6]);
    }),
  );

  it(
    'returns mapped iterable from iterable',
    $async(() => {
      const iter = $map(item => item * 2, range({ start: 1, end: 4 }));
      expect($await($toArray(iter))).toEqual([2, 4, 6]);
    }),
  );

  it(
    'returns mapped iterable (curried version)',
    $async(() => {
      const iter = $map(item => item * 2);
      expect($await($toArray(iter(range({ start: 1, end: 4 }))))).toEqual([2, 4, 6]);
    }),
  );

  it(
    'returns empty iterable from null',
    $async(() => {
      expect($await($toArray($map(item => item * 2, null)))).toEqual([]);
    }),
  );

  if ($isAsync) {
    it('returns mapped iterable (using a promise)', async () => {
      const iter = asyncMap(item => Promise.resolve(item * 2), [1, 2, 3]);
      expect(await asyncToArray(iter)).toEqual([2, 4, 6]);
    });
  }
});
