import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__toArray } from '../$to-array/$to-array.js';

$async;
export function* $__reverse(source) {
  yield* $await($__toArray(source)).reverse();
}

export const $reverse = /*#__PURE__*/ $iterableCurry($__reverse);
