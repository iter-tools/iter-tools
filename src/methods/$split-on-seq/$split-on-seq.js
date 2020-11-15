import { $iterableCurry, $ensureIterable } from '../../internal/$iterable';
import { $splitOnAnySeq } from '../$split-on-any-seq/$split-on-any-seq';

export function $splitOnSeq(source, separatorSeq) {
  return $splitOnAnySeq(source, [separatorSeq]);
}

export default $iterableCurry($splitOnSeq, {
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
