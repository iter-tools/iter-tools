import { $async, $await } from '../../../../generate/async.macro';
import { $__method__, $toArray, $wrap } from '../../..';

describe($async`__method__`, () => {
  it(
    'TODO: replace this test',
    $async(() => {
      expect($await($toArray($__method__($wrap([1, 2, 3]))))).toEqual([1, 2, 3]);
    }),
  );
});
