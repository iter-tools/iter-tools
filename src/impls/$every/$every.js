import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $__every(iterable, predicate) {
  let c = 0;
  $await;
  for (const value of iterable) {
    if (!$await(predicate(value, c++))) {
      return false;
    }
  }
  return true;
}

export const $every = /*#__PURE__*/ $iterableCurry($__every, { reduces: true });
