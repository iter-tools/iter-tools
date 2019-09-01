import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $some(iterable, func) {
  let c = 0;
  $await;
  for (const item of iterable) {
    if ($await(func(item, c++))) {
      return true;
    }
  }
  return false;
}

export default $iterableCurry($some, { reduces: true });
