import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $collate } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`collate`, () => {
  it(
    'output is sorted if passed a comparator',
    $async(() => {
      const iter = $collate((a, b) => a - b, $wrap([1, 8, 9]), $wrap([4, 6, 7]), $wrap([2, 3, 5]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }),
  );

  it(
    'works with input iterables of different lengths',
    $async(() => {
      const iter = $collate((a, b) => a - b, $wrap([]), $wrap([2, 3]), $wrap([1]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3]);
    }),
  );
});
