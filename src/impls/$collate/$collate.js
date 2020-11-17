import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $interleave } from '../$interleave/$interleave.js';

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

export function $collate(sources, comparator) {
  return $interleave(sources, $byComparison, { comparator });
}

export default /*#__PURE__*/ $iterableCurry($collate, {
  variadic: true,
});
