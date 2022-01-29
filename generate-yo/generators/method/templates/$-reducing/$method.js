import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $____method__(iterable) {
  let _value;

  $await;
  for (const value of iterable) {
    _value = value;
  }

  throw new Error('Dummy implementation');
}

export const $__method__ = $iterableCurry($____method__, {
  reduces: true,
});
