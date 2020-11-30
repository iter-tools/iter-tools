import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $__method__ } from '@iter-tools/es';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`__method__`, () => {
  it(
    'TODO: replace this test',
    $async(() => {
      expect($await($unwrap($__method__($wrap([1, 2, 3]))))).toEqual([1, 2, 3]);
    }),
  );
});
