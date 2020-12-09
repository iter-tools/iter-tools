import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $____method__(iterable) {
  let _item;

  $await;
  for (const item of iterable) {
    _item = item;
  }

  throw new Error('Dummy implementation');
}

export const $__method__ = $iterableCurry($____method__, {
  reduces: true,
});
