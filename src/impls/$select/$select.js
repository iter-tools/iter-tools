import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $__select(iterable, selector) {
  let bestValue;

  $await;
  for (const candidate of iterable) {
    if (bestValue === undefined || selector(bestValue, candidate)) {
      bestValue = candidate;
    }
  }

  return bestValue;
}

export const $select = $iterableCurry($__select, {
  reduces: true,
});
