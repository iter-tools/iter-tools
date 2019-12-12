import { $, $async, $await } from '../../../../generate/async.macro';

import { $cycle, $slice, $toArray } from '../../..';
import { $range } from '../../../__tests__/$range';

describe($`cycle`, () => {
  it(
    'cycles iterable infinitely',
    $async(() => {
      expect($await($toArray($slice(0, 7, $cycle($range(1, 4)))))).toEqual([1, 2, 3, 1, 2, 3, 1]);
    }),
  );
});
