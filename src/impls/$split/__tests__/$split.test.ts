import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $split } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`split`, () => {
  it(
    'should yield an iterable for every value in the iterable',
    $async(() => {
      expect($await($unwrapDeep($split($wrap([1, 2, 3]))))).toEqual([[1], [2], [3]]);
    }),
  );
});
