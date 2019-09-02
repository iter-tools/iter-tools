import { $async, $await } from '../../../../generate/async.macro';
import { $__method__, asyncWrap } from '../../..';

describe($async`__method__`, () => {
  it(
    'TODO: replace this test',
    $async(() => {
      expect($await($__method__(asyncWrap([1, 2, 3])))).toEqual(3);
    }),
  );
});
