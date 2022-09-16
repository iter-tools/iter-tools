import { $async, $await } from '../../../generate/async.macro.cjs';

import { $__peekerate } from '../$peekerate/$peekerate.js';

import { $iterableCurry } from '../../internal/$iterable.js';
import { defaultCompareOrder } from '../../internal/compare.js';

$async;
export function $__max(iterable, compare = defaultCompareOrder) {
  const peekr = $await($__peekerate(iterable));

  if (!peekr.done) {
    let maxValue = peekr.value;

    $await(peekr.advance());
    while (!peekr.done) {
      const value = peekr.value;
      if (compare(maxValue, value) < 0) {
        maxValue = value;
      }
      $await(peekr.advance());
    }
    return maxValue;
  }
}

export const $max = $iterableCurry($__max, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
