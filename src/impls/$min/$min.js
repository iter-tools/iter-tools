import { $async, $await } from '../../../generate/async.macro.cjs';

import { $__peekerate } from '../$peekerate/$peekerate.js';

import { $iterableCurry } from '../../internal/$iterable.js';
import { defaultCompareOrder } from '../../internal/compare.js';

$async;
export function $__min(iterable, compare = defaultCompareOrder) {
  const peekr = $await($__peekerate(iterable));

  if (!peekr.done) {
    let minValue = peekr.value;

    $await(peekr.advance());
    while (!peekr.done) {
      const value = peekr.value;
      if (compare(minValue, value) > 0) {
        minValue = value;
      }
      $await(peekr.advance());
    }
    return minValue;
  }
}

export const $min = $iterableCurry($__min, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
