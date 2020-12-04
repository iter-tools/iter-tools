import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__startsWithAny } from '../$starts-with-any/$starts-with-any.js';

export function $__startsWith(iterable, values) {
  return $__startsWithAny(iterable, [values]);
}

export const $startsWith = /*#__PURE__*/ $iterableCurry($__startsWith, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn('For string inputs use startsWithSeq instead of startsWith');
    }
  },
});
