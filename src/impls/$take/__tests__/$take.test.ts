import { $, $async, $await } from '../../../../generate/async.macro.cjs';

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
    'completes immediately if requesting 0 (or less) items',
    $async(() => {
      expect($await($unwrap($take(0, $wrap([1, 2, 3]))))).toEqual([]);
    }),
  );
  it(
    'completes immediately after taking the first n values',
    $async(() => {
      $async;
      function* twoItemsThenNever() {
        yield 1;
        yield 2;
        throw new Error('Should not yield after `2`');
      }
      expect($await($unwrap($take(2, twoItemsThenNever())))).toEqual([1, 2]);
    }),
  );
});
