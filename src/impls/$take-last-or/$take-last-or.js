import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $__takeLastOr(iterable, whenEmpty) {
  let _value = whenEmpty;

  $await;
  for (const value of iterable) {
    _value = value;
  }

  return _value;
}

export const $takeLastOr = /*#__PURE__*/ $iterableCurry($__takeLastOr, {
  reduces: true,
});
