import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry, $isLoopable } from '../../internal/$iterable.js';
import { validateArgs } from './internal/validate-args.js';

const defaultShouldFlat = (value) => typeof value !== 'string' && $isLoopable(value);

$async;
function* $flatInternal(shouldFlat, depth, currentDepth, source) {
  $await;
  for (const value of source) {
    if (currentDepth < depth && $await(shouldFlat(value))) {
      yield* $flatInternal(shouldFlat, depth, currentDepth + 1, value);
    } else {
      yield value;
    }
  }
}

export function $flat(source, shouldFlat = defaultShouldFlat, depth = 1) {
  return $flatInternal(shouldFlat, depth, 0, source);
}

export default /*#__PURE__*/ $iterableCurry($flat, {
  minArgs: 0,
  maxArgs: 2,
  validateArgs,
});
