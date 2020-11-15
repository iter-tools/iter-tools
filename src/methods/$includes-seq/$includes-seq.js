import { $iterableCurry, $ensureIterable } from '../../internal/$iterable';
import { $includesAnySeq } from '../$includes-any-seq/$includes-any-seq';

export function $includesSeq(iterable, seq) {
  return $includesAnySeq(iterable, [seq]);
}

export default $iterableCurry($includesSeq, {
  reduces: true,
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
