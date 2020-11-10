import { $iterableCurry, $ensureIterable } from '../../internal/$iterable';
import { $includesAnySubseq } from '../$includes-any-subseq/$includes-any-subseq';

export function $includesSubseq(iterable, subseq) {
  return $includesAnySubseq(iterable, [subseq]);
}

export default $iterableCurry($includesSubseq, {
  reduces: true,
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
