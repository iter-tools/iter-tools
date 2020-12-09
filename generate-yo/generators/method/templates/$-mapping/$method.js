import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $____method__(source) {
  $await;
  for (const item of source) {
    yield item;
  }

  throw new Error('Dummy implementation');
}

export const $__method__ = $iterableCurry($____method__);
