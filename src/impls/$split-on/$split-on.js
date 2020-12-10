import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__splitWith } from '../$split-with/$split-with.js';

export function $__splitOn(source, separator, same = Object.is) {
  return $__splitWith(source, (value) => same(separator, value));
}

export const $splitOn = /*#__PURE__*/ $iterableCurry($__splitOn, {
  minArgs: 1,
  maxArgs: 2,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn(`For string inputs use splitOnSeq instead of splitOn`);
    }
  },
});
