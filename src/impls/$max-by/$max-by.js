import { $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';
import { defaultCompareOrder } from '../../internal/compare.js';

$async;
export function $__maxBy(iterable, mapper, compare = defaultCompareOrder) {
  const peekr = $await($__peekerate(iterable));

  if (!peekr.done) {
    let bestValue = peekr.value;
    let bestMappedValue = $await(mapper(bestValue));

    $await(peekr.advance());
    while (!peekr.done) {
      const candidate = peekr.value;
      const candidateMappedValue = $await(mapper(candidate));
      if (compare(bestMappedValue, candidateMappedValue) < 0) {
        bestValue = candidate;
        bestMappedValue = candidateMappedValue;
      }
      $await(peekr.advance());
    }
    return bestValue;
  }
}

export const $maxBy = $iterableCurry($__maxBy, {
  reduces: true,
  minArgs: 1,
  maxArgs: 2,
  growRight: true,
});
