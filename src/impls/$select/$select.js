import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';

$async;
export function $__select(iterable, selector) {
  const peekr = $await($__peekerate(iterable));

  if (!peekr.done) {
    let bestValue = peekr.value;

    $await(peekr.advance());
    while (!peekr.done) {
      const candidate = peekr.value;
      if (selector(bestValue, candidate)) {
        bestValue = candidate;
      }
      $await(peekr.advance());
    }
    return bestValue;
  }
}

export const $select = $iterableCurry($__select, {
  reduces: true,
});
