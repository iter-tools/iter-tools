import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $every(iterable, func) {
  let c = 0;
  $await;
  for (const item of iterable) {
    if (!$await(func(item, c++))) {
      return false;
    }
  }
  return true;
}

export default $iterableCurry($every, { reduces: true });
