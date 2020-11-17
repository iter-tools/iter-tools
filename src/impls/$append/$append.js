import { $async } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $append(source, value) {
  yield* source;
  yield value;
}

export default /*#__PURE__*/ $iterableCurry($append);
