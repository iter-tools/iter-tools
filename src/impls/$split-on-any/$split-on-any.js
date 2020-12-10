import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__splitWith } from '../$split-with/$split-with.js';
import { __includes } from '../$includes/includes.js';

export function $__splitOnAny(source, separators, same = Object.is) {
  return $__splitWith(source, (value) => __includes(separators, value, (a, b) => same(b, a)));
}

export const $splitOnAny = /*#__PURE__*/ $iterableCurry($__splitOnAny, {
  minArgs: 1,
  maxArgs: 2,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn(`For string inputs use splitOnAnySeq instead of splitOnAny`);
    }
  },
});
