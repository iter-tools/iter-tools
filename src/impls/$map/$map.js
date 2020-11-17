import { $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $map(source, func) {
  let c = 0;
  $await;
  for (const item of source) {
    yield $await(func(item, c++));
  }
}

export default /*#__PURE__*/ $iterableCurry($map);
