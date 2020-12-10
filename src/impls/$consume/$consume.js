import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $__consume(iterable) {
  $await;
  /* eslint-disable */
  // prettier-ignore
  for (const _ of iterable) {}
  /* eslint-enable */
}

export const $consume = /*#__PURE__*/ $iterableCurry($__consume, {
  reduces: true,
});
