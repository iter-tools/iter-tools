import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $includesAny } from '../$includes-any/$includes-any.js';

export function $includes(iterable, value) {
  return $includesAny(iterable, [value]);
}

export default /*#__PURE__*/ $iterableCurry($includes, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use includesSeq instead of includes`);
    }
  },
});
