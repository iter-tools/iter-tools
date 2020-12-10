import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__firstOr } from '../$first-or/$first-or.js';
import { __includes } from '../$includes/includes.js';

const none = Symbol('none');

$async;
export function $__startsWithAny(iterable, values, same = Object.is) {
  const first = $await($__firstOr(iterable, none));
  if (first === none) return false;
  return __includes(values, first, (a, b) => same(b, a));
}

export const $startsWithAny = /*#__PURE__*/ $iterableCurry($__startsWithAny, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn('For string inputs use startsWithAnySeq instead of startsWithAny');
    }
  },
});
