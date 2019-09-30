import { $, $async, $await } from '../../../../generate/async.macro';

import { $compress, $toArray, range } from '../../..';

describe($`compress`, () => {
  it(
    'compress iterables',
    $async(() => {
      const iter = $compress(range(10), [false, true, false, true, true]);
      expect($await($toArray(iter))).toEqual([1, 3, 4]);
    }),
  );
});
