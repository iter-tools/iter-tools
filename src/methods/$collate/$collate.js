import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

import { $interleave } from '../$interleave/$interleave';

$async;
function* $byPosition({ start, step }, canTakeAny, ...buffers) {
  start = start % buffers.length;
  $await;
  for (let i = start; $await(canTakeAny()); i = (i + step) % buffers.length) {
    if ($await(buffers[i].canTake())) yield $await(buffers[i].take());
  }
}

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

const defaultOptions = {
  start: 0,
  step: 1,
};

export function $collate(start = 0, stepOrComparatorOrOptions = 1, iterables) {
  let by;
  let options;
  if (typeof stepOrComparatorOrOptions === 'function') {
    by = $byComparison;
    options = { comparator: stepOrComparatorOrOptions };
  } else if (typeof stepOrComparatorOrOptions === 'number' && typeof start === 'number') {
    by = $byPosition;
    options = { start, step: stepOrComparatorOrOptions };
  } else if (stepOrComparatorOrOptions && typeof stepOrComparatorOrOptions === 'object') {
    by = $byPosition;
    options = {
      ...defaultOptions,
      ...stepOrComparatorOrOptions,
    };
  } else {
    throw new TypeError(
      'collate was passed an invalid value which could not be interpreted as a step, a comparator, or an options object',
    );
  }

  return $interleave(by, options, iterables);
}

export default $iterableCurry($collate, {
  variadic: true,
  minArgs: 0,
  maxArgs: 2,
});
