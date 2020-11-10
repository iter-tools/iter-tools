import { $isSync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $joinWithSubseq } from '../$join-with-subseq/$join-with-subseq';

export function $joinWith(source, separator) {
  return $joinWithSubseq(source, [separator]);
}

export default $iterableCurry($joinWith, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use joinWithSubseq instead of joinWith`);
    }
  },
});
