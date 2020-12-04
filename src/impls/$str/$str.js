import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $__str(chars) {
  let result = '';

  $await;
  for (const char of chars) {
    result += char.toString();
  }

  return result;
}

export const $str = /*#__PURE__*/ $iterableCurry($__str, {
  reduces: true,
});
