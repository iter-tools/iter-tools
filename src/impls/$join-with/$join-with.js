import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__joinWithSeq } from '../$join-with-seq/$join-with-seq.js';

export function $__joinWith(source, separator) {
  return $__joinWithSeq(source, [separator]);
}

export const $joinWith = /*#__PURE__*/ $iterableCurry($__joinWith, {
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn(`For string inputs use joinWithSeq instead of joinWith`);
    }
  },
});
