import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';
import { $splitOnAnySeq } from '../$split-on-any-seq/$split-on-any-seq.js';

export function $splitOnSeq(source, separatorSeq) {
  return $splitOnAnySeq(source, [separatorSeq]);
}

export default /*#__PURE__*/ $iterableCurry($splitOnSeq, {
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
