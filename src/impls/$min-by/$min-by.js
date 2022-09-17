import { $__peekerate } from '../$peekerate/$peekerate.js';
import { $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { defaultCompareOrder } from '../../internal/compare.js';

$async;
export function $__minBy(iterable, mapper, compare = defaultCompareOrder) {
  const peekr = $await($__peekerate(iterable));

  if (!peekr.done) {
    let minValue = peekr.value;
    let minMappedValue = $await(mapper(minValue));

    $await(peekr.advance());
    while (!peekr.done) {
      const value = peekr.value;
      const mappedValue = $await(mapper(value));
      if (compare(minMappedValue, mappedValue) > 0) {
        minValue = value;
        minMappedValue = mappedValue;
      }
      $await(peekr.advance());
    }
    return minValue;
  }
}

export const $minBy = $iterableCurry($__minBy, {
  reduces: true,
  minArgs: 1,
  maxArgs: 2,
  growRight: true,
});
