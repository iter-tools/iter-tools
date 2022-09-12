import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';

$async;
export function $__selectBy(iterable, selector, mapper) {
  const peekr = $await($__peekerate(iterable));

  if (!peekr.done) {
    let bestItem = peekr.value;
    let bestValue = mapper(bestItem);

    $await(peekr.advance());
    while (!peekr.done) {
      const candidate = peekr.value;
      const candidateValue = mapper(candidate);
      if (selector(bestValue, candidateValue)) {
        bestItem = candidate;
        bestValue = candidateValue;
      }
      $await(peekr.advance());
    }
    return bestItem;
  }
}

export const $selectBy = $iterableCurry($__selectBy, {
  reduces: true,
});
