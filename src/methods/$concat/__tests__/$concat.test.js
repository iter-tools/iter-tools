import { $async, $await } from '../../../../generate/async.macro';
import { $concat, $toArray, range } from '../../..';

describe($async`concat`, () => {
  it(
    'concats iterables',
    $async(() => {
      const iter = $concat(range({ start: 1, end: 3 }), [3, 4]);
      expect($await($toArray(iter))).toEqual([1, 2, 3, 4]);
    }),
  );
});
