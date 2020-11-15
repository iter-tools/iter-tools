import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $interleave } from '../$interleave/$interleave';
import { validateArgs } from './internal/validate-args';

$async;
function* $byPosition({ start, step }, all, ...peekrs) {
  start = start % peekrs.length;
  $await;
  for (let i = start; !all.done; i = (i + step) % peekrs.length) {
    const peekr = peekrs[i];
    if (!peekr.done) {
      yield peekr.value;
      $await(peekr.advance());
    }
  }
}

export function $roundRobin(sources, start = 0, step = 1) {
  return $interleave(sources, $byPosition, { start, step });
}

export default $iterableCurry($roundRobin, {
  variadic: true,
  minArgs: 0,
  maxArgs: 2,
  validateArgs,
});
