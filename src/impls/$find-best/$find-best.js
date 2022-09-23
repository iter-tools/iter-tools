import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__findBestOr } from '../$find-best-or/$find-best-or.js';

$async;
export function $__findBest(iterable, comparer, mapper = (value) => value) {
  return $await($__findBestOr(iterable, undefined, comparer, mapper));
}

export const $findBest = $iterableCurry($__findBest, {
  reduces: true,
  minArgs: 1,
  maxArgs: 2,
  growRight: true,
});
