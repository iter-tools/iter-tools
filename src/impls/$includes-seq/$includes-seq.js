import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';
import { $includesAnySeq } from '../$includes-any-seq/$includes-any-seq.js';

export function $includesSeq(iterable, seq) {
  return $includesAnySeq(iterable, [seq]);
}

export default /*#__PURE__*/ $iterableCurry($includesSeq, {
  reduces: true,
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
