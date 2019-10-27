import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

import { $interleave } from '../$interleave/$interleave';

$async;
function* $byComparison({ comparator }, canTakeAny, ...buffers) {
  let candidateBuffer;
  while ((candidateBuffer = $await(canTakeAny()))) {
    let candidateItem = $await(candidateBuffer.peek());

    for (const buffer of buffers) {
      const item = $await(buffer.peek());
      if ($await(buffer.canTake()) && comparator(candidateItem, item) < 0) {
        candidateItem = item;
        candidateBuffer = buffer;
      }
    }

    yield $await(candidateBuffer.take());
  }
}

export function $collate(sources, comparator) {
  return $interleave(sources, $byComparison, { comparator });
}

export default $iterableCurry($collate, {
  variadic: true,
});
