import { $, $async, $await } from '../../../../generate/async.macro';

import { $sort, $toArray, $wrap } from '../../..';

describe($`sort`, () => {
  it(
    'sorts the input',
    $async(() => {
      expect($await($toArray($sort($wrap([2, 3, 1, 9, 0, -2]))))).toEqual([-2, 0, 1, 2, 3, 9]);
    }),
  );
});
