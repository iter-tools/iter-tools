import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $interposeSeq } from '../$interpose-seq/$interpose-seq.js';

export function $interpose(source, value) {
  return $interposeSeq(source, [value]);
}

export default /*#__PURE__*/ $iterableCurry($interpose, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use interposeSeq instead of interpose`);
    }
  },
});
