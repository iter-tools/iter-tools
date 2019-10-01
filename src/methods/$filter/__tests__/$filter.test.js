import { $, $isAsync, $async, $await } from '../../../../generate/async.macro';

import { $filter, $toArray, range } from '../../..';

describe($`filter`, () => {
  it(
    'returns filtered iterable',
    $async(() => {
      const iter = $filter(item => item % 2 === 0, [1, 2, 3, 4, 5, 6]);
      expect($await($toArray(iter))).toEqual([2, 4, 6]);
    }),
  );

  it(
    'returns filtered iterable from iterable',
    $async(() => {
      const iter = $filter(item => item % 2 === 0, range({ start: 1, end: 7 }));
      expect($await($toArray(iter))).toEqual([2, 4, 6]);
    }),
  );

  it(
    'returns filtered iterable (curried version)',
    $async(() => {
      const iter = $filter(item => item % 2 === 0);
      expect($await($toArray(iter(range({ start: 1, end: 7 }))))).toEqual([2, 4, 6]);
    }),
  );

  it(
    'returns empty iterable from null',
    $async(() => {
      expect($await($toArray($filter(item => item, null)))).toEqual([]);
    }),
  );

  if ($isAsync) {
    it('returns filtered iterable (using a promise)', async () => {
      const iter = $filter(item => Promise.resolve(item % 2 === 0), [1, 2, 3, 4, 5, 6]);
      expect(await $toArray(iter)).toEqual([2, 4, 6]);
    });
  }
});
