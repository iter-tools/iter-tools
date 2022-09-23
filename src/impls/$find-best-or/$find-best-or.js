import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';

$async;
export function $__findBestOr(iterable, notFoundValue, comparer, mapper = (value) => value) {
  const peekr = $await($__peekerate(iterable));

  if (peekr.done) {
    return notFoundValue;
  } else {
    let best = peekr.value;
    let bestValue = $await(mapper(best, peekr.index));

    $await(peekr.advance());

    while (!peekr.done) {
      const candidate = peekr.value;
      const candidateValue = $await(mapper(candidate, peekr.index));
      if (comparer(bestValue, candidateValue)) {
        best = candidate;
        bestValue = candidateValue;
      }

      $await(peekr.advance());
    }
    return best;
  }
}

export const $findBestOr = $iterableCurry($__findBestOr, {
  reduces: true,
  minArgs: 2,
  maxArgs: 3,
  growRight: true,
});
