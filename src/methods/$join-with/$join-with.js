import { $isSync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $joinWithSeq } from '../$join-with-seq/$join-with-seq';

export function $joinWith(source, separator) {
  return $joinWithSeq(source, [separator]);
}

export default $iterableCurry($joinWith, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use joinWithSeq instead of joinWith`);
    }
  },
});
