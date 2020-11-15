import { $, $async, $await } from '../../../../generate/async.macro';

import { $split } from '../../..';
import { $wrap, $unwrapDeep } from '../../../test/$helpers';

describe($`split`, () => {
  it(
    'should yield an iterable for every item in the iterable',
    $async(() => {
      expect($await($unwrapDeep($split($wrap([1, 2, 3]))))).toEqual([[1], [2], [3]]);
    }),
  );
});
