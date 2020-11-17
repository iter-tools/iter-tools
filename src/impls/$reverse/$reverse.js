import { $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { $toArray } from '../$to-array/$to-array.js';

$async;
export function* $reverse(source) {
  yield* $await($toArray(source)).reverse();
}

export default /*#__PURE__*/ $iterableCurry($reverse);
