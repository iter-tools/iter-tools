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

export function $roundRobin(sources, start = 0, step = 1) {
  return $interleave(sources, $byPosition, { start, step });
}

export default $iterableCurry($roundRobin, {
  variadic: true,
  minArgs: 0,
  maxArgs: 2,
  validateArgs(args) {
    if (args[1] && typeof args[1] === 'object') {
      const { start, step } = args[1];
      args[0] = start != null ? start : 0;
      args[1] = step != null ? start : 1;
    }

    if (args[1] <= 0) {
      throw new Error('step argument to roundRobin must be >= 0');
    }
  },
});
