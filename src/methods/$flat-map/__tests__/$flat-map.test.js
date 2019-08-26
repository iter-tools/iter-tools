import { $async, $await } from '../../../../generate/async.macro';
import { $flatMap, $toArray, range } from '../../..';

describe($async`flatMap`, () => {
  it(
    'returns flatMapped iterable',
    $async(() => {
      const iter = $flatMap(item => [item, item * 2], [1, 2, 3]);
      expect($await($toArray(iter))).toEqual([1, 2, 2, 4, 3, 6]);
    }),
  );

  it(
    'returns flatMapped iterable from iterable',
    $async(() => {
      const iter = $flatMap(item => [item, item * 2], range({ start: 1, end: 4 }));
      expect($await($toArray(iter))).toEqual([1, 2, 2, 4, 3, 6]);
    }),
  );

  it(
    'returns flatMapped iterable (curried version)',
    $async(() => {
      const iter = $flatMap(item => [item, item * 2]);
      expect($await($toArray(iter(range({ start: 1, end: 4 }))))).toEqual([1, 2, 2, 4, 3, 6]);
    }),
  );

  it(
    'returns empty iterable from null',
    $async(() => {
      expect($await($toArray($flatMap(item => item, null)))).toEqual([]);
    }),
  );
});
