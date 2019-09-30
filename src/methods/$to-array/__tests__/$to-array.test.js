import { $, $async, $await } from '../../../../generate/async.macro';

import { $toArray, range } from '../../..';

describe($`toArray`, () => {
  it(
    'works',
    $async(() => {
      expect($await($toArray(range(3)))).toEqual([0, 1, 2]);
    }),
  );
});
