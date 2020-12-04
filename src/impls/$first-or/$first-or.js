import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro.cjs';

import { $iterableCurry, $callReturn } from '../../internal/$iterable.js';

$async;
export function $__firstOr(iterable, whenEmpty) {
  const iter = iterable[$iteratorSymbol]();
  const { value, done } = $await(iter.next());

  if (done) return whenEmpty;

  $await($callReturn(iter));

  return value;
}

export const $firstOr = /*#__PURE__*/ $iterableCurry($__firstOr, {
  reduces: true,
});
