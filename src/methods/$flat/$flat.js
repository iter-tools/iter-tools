import { $async, $await, $isAsync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

const defaultShouldFlat = item =>
  ($isAsync
    ? typeof item[Symbol.iterator] === 'function' ||
      typeof item[Symbol.asyncIterator] === 'function'
    : typeof item[Symbol.iterator] === 'function') && typeof item !== 'string';

$async;
function* $flatInternal(shouldFlat, depth, currentDepth, iterable) {
  $await;
  for (const item of iterable) {
    if (currentDepth < depth && $await(shouldFlat(item))) {
      yield* $flatInternal(shouldFlat, depth, currentDepth + 1, item);
    } else {
      yield item;
    }
  }
}

export function $flat(iterable, shouldFlat = defaultShouldFlat, depthOrOptions = 1) {
  let depth = depthOrOptions;
  if (depthOrOptions && typeof depthOrOptions === 'object') {
    ({ shouldFlat = defaultShouldFlat, depth = 1 } = depthOrOptions);
  }

  return $flatInternal(shouldFlat, depth, 0, iterable);
}

export default $iterableCurry($flat, { minArgs: 0, maxArgs: 2 });
