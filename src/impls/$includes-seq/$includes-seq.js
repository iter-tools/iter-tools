import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';
import { $__includesAnySeq } from '../$includes-any-seq/$includes-any-seq.js';

export function $__includesSeq(iterable, seq, same = Object.is) {
  return $__includesAnySeq(iterable, [seq], same);
}

export const $includesSeq = /*#__PURE__*/ $iterableCurry($__includesSeq, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    args[1] = $ensureIterable(args[1]);
  },
});
