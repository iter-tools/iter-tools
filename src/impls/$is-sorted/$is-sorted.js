import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { defaultCompare } from '../../internal/compare.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';

$async;
export function $__isSorted(iterable, comparator = defaultCompare) {
  const peekr = $await($__peekerate(iterable));

  while (!peekr.done) {
    const { value } = peekr;
    $await(peekr.advance());

    if (!peekr.done && comparator(value, peekr.value) > 0) {
      $await(peekr.return());
      return false;
    }
  }
  return true;
}

export const $isSorted = /*#__PURE__*/ $iterableCurry($__isSorted, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
