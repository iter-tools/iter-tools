import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $map } from '../$map/$map.js';

$async;
export function* $flatMap(source, func) {
  $await;
  for (const item of $map(source, func)) {
    yield* item;
  }
}

export default /*#__PURE__*/ $iterableCurry($flatMap);
