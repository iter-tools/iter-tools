import { $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';
import { defaultCompareOrder } from '../../internal/compare.js';

$async;
export function $__maxBy(iterable, mapper, compare = defaultCompareOrder) {
  const peekr = $await($__peekerate(iterable));

  if (!peekr.done) {
    let maxValue = peekr.value;
    let maxMappedValue = $await(mapper(maxValue));

    $await(peekr.advance());
    while (!peekr.done) {
      const value = peekr.value;
      const mappedValue = $await(mapper(value));
      if (compare(maxMappedValue, mappedValue) < 0) {
        maxValue = value;
        maxMappedValue = mappedValue;
      }
      $await(peekr.advance());
    }
    return maxValue;
  }
}

export const $maxBy = $iterableCurry($__maxBy, {
  reduces: true,
  minArgs: 1,
  maxArgs: 2,
  growRight: true,
});
