import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $take } from '@iter-tools/es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`take`, () => {
  it(
    'takes the first n items',
    $async(() => {
      expect($await($unwrap($take(2, $wrap([1, 2, 3]))))).toEqual([1, 2]);
    }),
  );
});
