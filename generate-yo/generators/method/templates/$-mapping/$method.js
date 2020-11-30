import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__method__(source) {
  $await;
  for (const item of source) {
    yield item;
  }

  throw new Error('Dummy implementation');
}

export default $iterableCurry($__method__);
