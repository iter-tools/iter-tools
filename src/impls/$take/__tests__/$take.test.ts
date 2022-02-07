import { $, $async, $await, $isAsync } from '../../../../generate/async.macro.cjs';

import { $take } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`take`, () => {
  it(
    'takes the first n values',
    $async(() => {
      expect($await($unwrap($take(2, $wrap([1, 2, 3]))))).toEqual([1, 2]);
    }),
  );
  it(
    'completes immediately after taking the first n values',
    $async(() => {
      $async;
      function* twoItemsThenNever() {
        yield 1;
        yield 2;
        // Never yields 3.
        if ($isAsync) {
          $await(new Promise(() => undefined));
        } else {
          while (true) {
            // Never ends
          }
        }
        yield 3;
      }
      expect($await($unwrap($take(2, twoItemsThenNever())))).toEqual([1, 2]);
    }),
  );
});
