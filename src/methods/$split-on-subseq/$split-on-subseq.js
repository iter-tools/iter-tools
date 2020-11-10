import { $iterableCurry, $ensureIterable } from '../../internal/$iterable';
import { $splitOnAnySubseq } from '../$split-on-any-subseq/$split-on-any-subseq';

export function $splitOnSubseq(source, separatorSubseq) {
  return $splitOnAnySubseq(source, [separatorSubseq]);
}

export default $iterableCurry($splitOnSubseq, {
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
