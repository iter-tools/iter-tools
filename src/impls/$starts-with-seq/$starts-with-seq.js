import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';

import { $startsWithAnySeq } from '../$starts-with-any-seq/$starts-with-any-seq.js';

export function $startsWithSeq(iterable, seq) {
  return $startsWithAnySeq(iterable, [seq]);
}

export default /*#__PURE__*/ $iterableCurry($startsWithSeq, {
  reduces: true,
  validateArgs(args) {
    args[0] = $ensureIterable(args[0]);
  },
});
