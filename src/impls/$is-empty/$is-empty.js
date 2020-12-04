import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__firstOr } from '../$first-or/$first-or.js';

const none = Symbol('none');

$async;
export function $__isEmpty(iterable) {
  return $await($__firstOr(iterable, none)) === none;
}

export const $isEmpty = /*#__PURE__*/ $iterableCurry($__isEmpty, {
  reduces: true,
});
