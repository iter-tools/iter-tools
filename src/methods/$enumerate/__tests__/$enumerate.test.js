import { $async, $await } from '../../../../generate/async.macro';
import { $enumerate, $toArray, range } from '../../..';

describe($async`enumerate`, () => {
  it(
    'enumerates iterables',
    $async(() => {
      const iter = $enumerate(range({ start: 1, end: 4 }));
      expect($await($toArray(iter))).toEqual([[0, 1], [1, 2], [2, 3]]);
    }),
  );

  it(
    'enumerates iterables with start',
    $async(() => {
      const iter = $enumerate(3, range({ start: 1, end: 4 }));
      expect($await($toArray(iter))).toEqual([[3, 1], [4, 2], [5, 3]]);
    }),
  );
});
