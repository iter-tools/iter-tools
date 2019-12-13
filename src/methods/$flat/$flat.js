import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry, $isIterable } from '../../internal/$iterable';

const defaultShouldFlat = item => typeof item !== 'string' && $isIterable(item);

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

export function $flat(source, shouldFlat = defaultShouldFlat, depthOrOptions = 1) {
  let depth = depthOrOptions;
  if (depthOrOptions && typeof depthOrOptions === 'object') {
    ({ shouldFlat = defaultShouldFlat, depth = 1 } = depthOrOptions);
  }

  return $flatInternal(shouldFlat, depth, 0, source);
}

export default $iterableCurry($flat, { minArgs: 0, maxArgs: 2 });
