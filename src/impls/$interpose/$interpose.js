import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__interposeSeq } from '../$interpose-seq/$interpose-seq.js';

export function $__interpose(source, value) {
  return $__interposeSeq(source, [value]);
}

export const $interpose = /*#__PURE__*/ $iterableCurry($__interpose, {
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn(`For string inputs use interposeSeq instead of interpose`);
    }
  },
});
