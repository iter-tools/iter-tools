import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';

import { $__startsWithAnySeq } from '../$starts-with-any-seq/$starts-with-any-seq.js';

export function $__startsWithSeq(iterable, seq) {
  return $__startsWithAnySeq(iterable, [seq]);
}

export const $startsWithSeq = /*#__PURE__*/ $iterableCurry($__startsWithSeq, {
  reduces: true,
  validateArgs(args) {
    args[1] = $ensureIterable(args[1]);
  },
});
