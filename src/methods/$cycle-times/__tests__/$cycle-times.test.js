import { $, $async, $await } from '../../../../generate/async.macro';

import { $cycleTimes, $toArray } from '../../..';
import { $range } from '../../../__tests__/$range';

describe($`cycleTimes`, () => {
  it(
    'can cycle a limited number of times',
    $async(() => {
      expect($await($toArray($cycleTimes(3, $range(1, 4))))).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3]);
    }),
  );

  it(
    'can be reused',
    $async(() => {
      const myCycle = $cycleTimes(2, $range(1, 4));
      expect($await($toArray(myCycle))).toEqual([1, 2, 3, 1, 2, 3]);
      expect($await($toArray(myCycle))).toEqual([1, 2, 3, 1, 2, 3]);
    }),
  );
});
