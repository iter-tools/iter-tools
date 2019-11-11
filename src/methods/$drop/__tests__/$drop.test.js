import { $, $async, $await } from '../../../../generate/async.macro';

import { $drop, $toArray, $wrap } from '../../..';

describe($`drop`, () => {
  it(
    'drops n items',
    $async(() => {
      expect($await($toArray($drop(1, $wrap([1, 2, 3]))))).toEqual([2, 3]);
    }),
  );
});
