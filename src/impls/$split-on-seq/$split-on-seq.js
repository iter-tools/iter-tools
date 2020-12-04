import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';
import { $__splitOnAnySeq } from '../$split-on-any-seq/$split-on-any-seq.js';

export function $__splitOnSeq(source, separatorSeq) {
  return $__splitOnAnySeq(source, [separatorSeq]);
}

export const $splitOnSeq = /*#__PURE__*/ $iterableCurry($__splitOnSeq, {
  validateArgs(args) {
    args[1] = $ensureIterable(args[1]);
  },
});
