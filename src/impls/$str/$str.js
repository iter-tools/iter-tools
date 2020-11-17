import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $str(chars) {
  let result = '';

  $await;
  for (const char of chars) {
    result += char.toString();
  }

  return result;
}

export default /*#__PURE__*/ $iterableCurry($str, {
  reduces: true,
});
