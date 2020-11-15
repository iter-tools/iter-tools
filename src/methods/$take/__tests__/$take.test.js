import { $, $async, $await } from '../../../../generate/async.macro';

import { $take } from '../../..';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`take`, () => {
  it(
    'takes the first n items',
    $async(() => {
      expect($await($unwrap($take(2, $wrap([1, 2, 3]))))).toEqual([1, 2]);
    }),
  );
});
