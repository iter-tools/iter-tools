import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $take(iterable, n) {
  let i = 0;
  $await;
  for (const item of iterable) {
    if (i++ === n) break;
    yield item;
  }
}

export default $iterableCurry($take);
