import { $, $async, $await } from '../../../../generate/async.macro';

import { $take, $toArray, $wrap } from '../../..';

describe($`take`, () => {
  it(
    'takes the first n items',
    $async(() => {
      expect($await($toArray($take(2, $wrap([1, 2, 3]))))).toEqual([1, 2]);
    }),
  );
});
