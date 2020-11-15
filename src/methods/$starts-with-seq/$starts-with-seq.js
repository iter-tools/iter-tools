import { $iterableCurry, $ensureIterable } from '../../internal/$iterable';

import { $startsWithAnySeq } from '../$starts-with-any-seq/$starts-with-any-seq';

export function $startsWithSeq(iterable, seq) {
  return $startsWithAnySeq(iterable, [seq]);
}

export default $iterableCurry($startsWithSeq, {
  reduces: true,
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
