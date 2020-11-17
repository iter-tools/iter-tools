import { $async } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $prepend(source, value) {
  yield value;
  yield* source;
}

export default /*#__PURE__*/ $iterableCurry($prepend);
