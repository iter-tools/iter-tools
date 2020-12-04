import { $async } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__append(source, value) {
  yield* source;
  yield value;
}

export const $append = /*#__PURE__*/ $iterableCurry($__append);
