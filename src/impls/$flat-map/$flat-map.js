import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $map } from '../$map/$map.js';

$async;
export function* $flatMap(source, func) {
  $await;
  for (const value of $map(source, func)) {
    yield* value;
  }
}

export default /*#__PURE__*/ $iterableCurry($flatMap);
