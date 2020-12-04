import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__includesAny } from '../$includes-any/$includes-any.js';

export function $__includes(iterable, value) {
  return $__includesAny(iterable, [value]);
}

export const $includes = /*#__PURE__*/ $iterableCurry($__includes, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn(`For string inputs use includesSeq instead of includes`);
    }
  },
});
