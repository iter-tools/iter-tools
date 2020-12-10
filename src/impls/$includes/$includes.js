import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__findOr } from '../$find-or/$find-or.js';

const none = Symbol('none');

$async;
export function $__includes(iterable, value, same = Object.is) {
  return $await($__findOr(iterable, none, (v) => same(value, v))) !== none;
}

export const $includes = /*#__PURE__*/ $iterableCurry($__includes, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn(`For string inputs use includesSeq instead of includes`);
    }
  },
});
