import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__findOr } from '../$find-or/$find-or.js';

const none = Symbol('none');

$async;
export function $__includesAny(iterable, values) {
  return $await($__findOr(iterable, none, (value) => values.includes(value))) !== none;
}

export const $includesAny = /*#__PURE__*/ $iterableCurry($__includesAny, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[0] === 'string') {
      console.warn(`For string inputs use includesAnySeq instead of includesAny`);
    }
  },
});
