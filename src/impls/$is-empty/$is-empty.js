import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $firstOr } from '../$first-or/$first-or.js';

const none = Symbol('none');

$async;
export function $isEmpty(iterable) {
  return $await($firstOr(iterable, none)) === none;
}

export default /*#__PURE__*/ $iterableCurry($isEmpty, {
  reduces: true,
});
