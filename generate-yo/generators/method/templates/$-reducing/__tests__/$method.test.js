import { $, $async, $await } from '../../../../generate/async.macro';

import { $__method__ } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`__method__`, () => {
  it(
    'TODO: replace this test',
    $async(() => {
      expect($await($__method__($wrap([1, 2, 3])))).toEqual(3);
    }),
  );
});
