import { $async } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__prepend(source, value) {
  yield value;
  yield* source;
}

export const $prepend = /*#__PURE__*/ $iterableCurry($__prepend);
