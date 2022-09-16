import { $async, $await } from '../../../generate/async.macro.cjs';

import { $__peekerate } from '../$peekerate/$peekerate.js';

import { $iterableCurry } from '../../internal/$iterable.js';
import { defaultCompareOrder } from '../../internal/compare.js';

$async;
export function $__max(iterable, compare = defaultCompareOrder) {
  const peekr = $await($__peekerate(iterable));

  if (!peekr.done) {
    let bestValue = peekr.value;

    $await(peekr.advance());
    while (!peekr.done) {
      const candidate = peekr.value;
      if (compare(bestValue, candidate) < 0) {
        bestValue = candidate;
      }
      $await(peekr.advance());
    }
    return bestValue;
  }
}

export const $max = $iterableCurry($__max, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
