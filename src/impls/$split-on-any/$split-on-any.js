import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $splitWith } from '../$split-with/$split-with.js';

export function $splitOnAny(source, separators) {
  return $splitWith(source, (value) => separators.includes(value));
}

export default /*#__PURE__*/ $iterableCurry($splitOnAny, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use splitOnAnySeq instead of splitOnAny`);
    }
  },
});
