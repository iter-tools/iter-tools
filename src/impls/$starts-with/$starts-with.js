import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__firstOr } from '../$first-or/$first-or.js';

const none = Symbol('none');

$async;
export function $__startsWith(iterable, value, same = Object.is) {
  const first = $await($__firstOr(iterable, none));
  if (first === none) return false;
  return same(value, first);
}

export const $startsWith = /*#__PURE__*/ $iterableCurry($__startsWith, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn('For string inputs use startsWithSeq instead of startsWith');
    }
  },
});
