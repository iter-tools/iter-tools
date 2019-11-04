import { $, $async, $await } from '../../../../generate/async.macro';

import { $prepend, $toArray, $wrap } from '../../..';

describe($`prepend`, () => {
  it(
    'prepends a value',
    $async(() => {
      expect($await($toArray($prepend(1, $wrap([2, 3]))))).toEqual([1, 2, 3]);
    }),
  );
});
