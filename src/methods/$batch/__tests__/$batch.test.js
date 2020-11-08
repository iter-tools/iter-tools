import { $, $async, $await } from '../../../../generate/async.macro';

import { $batch, range } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';

describe($`batch`, () => {
  it(
    'returns an iterable with batches',
    $async(() => {
      const iter = $batch(2, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect($await($uw(iter))).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
    }),
  );

  it(
    'returns an iterable with batches when passed an iterable',
    $async(() => {
      const iter = $batch(2, range({ start: 1, end: 10 }));
      expect($await($uw(iter))).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9]]);
    }),
  );

  it(
    'returns an iterable with batches when passed an iterable (2)',
    $async(() => {
      const iter = $batch(2, range({ start: 1, end: 9 }));
      expect($await($uw(iter))).toEqual([[1, 2], [3, 4], [5, 6], [7, 8]]);
    }),
  );

  it(
    'returns an iterable with batches (curried version)',
    $async(() => {
      const iter = $batch(2);
      expect($await($uw(iter(range({ start: 1, end: 10 }))))).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9],
      ]);
    }),
  );

  it(
    'returns an empty iterable when passed null',
    $async(() => {
      expect($await($uw($batch(2, null)))).toEqual([]);
    }),
  );

  it(
    'errors when passed size <= 0',
    $async(() => {
      expect(() => $batch(0, [])).toThrowErrorMatchingSnapshot();
    }),
  );
});
