import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $str(chars) {
  let result = '';

  $await;
  for (const char of chars) {
    result += char.toString();
  }

  return result;
}

export default $iterableCurry($str, {
  reduces: true,
});
