import { $, $async, $await } from '../../../../generate/async.macro';

import { $toArray } from '../../..';
import { $range } from '../../../__tests__/$range';

describe($`toArray`, () => {
  it(
    'turns an iterable into an array',
    $async(() => {
      expect($await($toArray($range(0, 3)))).toEqual([0, 1, 2]);
    }),
  );
});
