import { $, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__interleave } from '../$interleave/$interleave.js';
import { makeValidateArgs } from './internal/validate-args.js';

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

export function $__roundRobin(sources, step = 1, start = 0) {
  return $__interleave(sources, $byPosition, { start, step });
}

export const $roundRobin = /*#__PURE__*/ $iterableCurry($__roundRobin, {
  variadic: true,
  minArgs: 0,
  maxArgs: 2,
  validateArgs: /*#__PURE__*/ makeValidateArgs($`roundRobin`),
});
