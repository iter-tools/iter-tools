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

export function $__flat(source, depth = 1, shouldFlat = defaultShouldFlat) {
  return $flatInternal(shouldFlat, depth, 0, source);
}

export const $flat = /*#__PURE__*/ $iterableCurry($__flat, {
  minArgs: 0,
  maxArgs: 2,
  validateArgs,
});
