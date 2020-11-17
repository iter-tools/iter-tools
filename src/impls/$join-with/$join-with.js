import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $joinWithSeq } from '../$join-with-seq/$join-with-seq.js';

export function $joinWith(source, separator) {
  return $joinWithSeq(source, [separator]);
}

export default /*#__PURE__*/ $iterableCurry($joinWith, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use joinWithSeq instead of joinWith`);
    }
  },
});
