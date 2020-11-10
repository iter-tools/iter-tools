import { $iterableCurry, $ensureIterable } from '../../internal/$iterable';

import { $startsWithAnySubseq } from '../$starts-with-any-subseq/$starts-with-any-subseq';

export function $startsWithSubseq(iterable, subseq) {
  return $startsWithAnySubseq(iterable, [subseq]);
}

export default $iterableCurry($startsWithSubseq, {
  reduces: true,
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
