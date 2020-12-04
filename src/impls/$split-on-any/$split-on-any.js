import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__splitWith } from '../$split-with/$split-with.js';

export function $__splitOnAny(source, separators) {
  return $__splitWith(source, (value) => separators.includes(value));
}

export const $splitOnAny = /*#__PURE__*/ $iterableCurry($__splitOnAny, {
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn(`For string inputs use splitOnAnySeq instead of splitOnAny`);
    }
  },
});
