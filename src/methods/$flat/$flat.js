import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry, $isIterable } from '../../internal/$iterable';
import { validateArgs } from './internal/validate-args';

const defaultShouldFlat = (item) => typeof item !== 'string' && $isIterable(item);

$async;
function* $flatInternal(shouldFlat, depth, currentDepth, source) {
  $await;
  for (const item of source) {
    if (currentDepth < depth && $await(shouldFlat(item))) {
      yield* $flatInternal(shouldFlat, depth, currentDepth + 1, item);
    } else {
      yield item;
    }
  }
}

export function $flat(source, shouldFlat = defaultShouldFlat, depth = 1) {
  return $flatInternal(shouldFlat, depth, 0, source);
}

export default $iterableCurry($flat, {
  minArgs: 0,
  maxArgs: 2,
  validateArgs,
});
