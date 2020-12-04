import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__interleave } from '../$interleave/$interleave.js';

$async;
function* $byComparison({ comparator }, all, ...peekrs) {
  let candidate;
  while (!all.done) {
    candidate = all.value;
    for (const peekr of peekrs) {
      if (!peekr.done && comparator(candidate.value, peekr.value) < 0) {
        candidate = peekr;
      }
    }

    yield candidate.value;
    $await(candidate.advance());
  }
}

export function $__collate(sources, comparator) {
  return $__interleave(sources, $byComparison, { comparator });
}

export const $collate = /*#__PURE__*/ $iterableCurry($__collate, {
  variadic: true,
});
