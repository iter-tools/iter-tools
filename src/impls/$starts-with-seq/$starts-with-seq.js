import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';

import { $__startsWithAnySeq } from '../$starts-with-any-seq/$starts-with-any-seq.js';

export function $__startsWithSeq(iterable, seq, same = Object.is) {
  return $__startsWithAnySeq(iterable, [seq], same);
}

export const $startsWithSeq = /*#__PURE__*/ $iterableCurry($__startsWithSeq, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    args[1] = $ensureIterable(args[1]);
  },
});
