import { $, $async, $await } from '../../../../generate/async.macro';

import { $cycle, $slice, $toArray, $wrap, range } from '../../..';

describe($`cycle`, () => {
  it(
    'return infinite cycle',
    $async(() => {
      expect($await($toArray($slice(0, 6, $cycle($wrap([1, 2, 3])))))).toEqual([1, 2, 3, 1, 2, 3]);
    }),
  );

  it(
    'can be reused',
    $async(() => {
      const myCycle = $cycle(range(1, 4));
      expect($await($toArray($slice(0, 7, myCycle)))).toEqual([1, 2, 3, 1, 2, 3, 1]);
      expect($await($toArray($slice(0, 7, myCycle)))).toEqual([1, 2, 3, 1, 2, 3, 1]);
    }),
  );

  it(
    'can cycle a limited number of times',
    $async(() => {
      expect($await($toArray($cycle(3, $wrap([1, 2, 3]))))).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3]);
    }),
  );
});
