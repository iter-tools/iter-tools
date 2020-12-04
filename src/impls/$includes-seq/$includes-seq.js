import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';
import { $__includesAnySeq } from '../$includes-any-seq/$includes-any-seq.js';

export function $__includesSeq(iterable, seq) {
  return $__includesAnySeq(iterable, [seq]);
}

export const $includesSeq = /*#__PURE__*/ $iterableCurry($__includesSeq, {
  reduces: true,
  validateArgs(args) {
    args[1] = $ensureIterable(args[1]);
  },
});
