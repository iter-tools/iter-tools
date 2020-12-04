import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__firstOr } from '../$first-or/$first-or.js';

const none = Symbol('none');

$async;
export function $__startsWithAny(iterable, values) {
  return values.includes($await($__firstOr(iterable, none)));
}

export const $startsWithAny = /*#__PURE__*/ $iterableCurry($__startsWithAny, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn('For string inputs use startsWithAnySeq instead of startsWithAny');
    }
  },
});
