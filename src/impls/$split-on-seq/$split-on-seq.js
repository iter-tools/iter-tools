import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';
import { $__splitOnAnySeq } from '../$split-on-any-seq/$split-on-any-seq.js';

export function $__splitOnSeq(source, separatorSeq, same = Object.is) {
  return $__splitOnAnySeq(source, [separatorSeq], same);
}

export const $splitOnSeq = /*#__PURE__*/ $iterableCurry($__splitOnSeq, {
  minArgs: 1,
  maxArgs: 2,
  validateArgs(args) {
    args[1] = $ensureIterable(args[1]);
  },
});
