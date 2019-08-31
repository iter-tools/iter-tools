import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $takeWhile(iterable, func) {
  let take = true;
  let c = 0;

  $await;
  for (const item of iterable) {
    take = $await(func(item, c++));
    if (take) {
      yield item;
    } else {
      break;
    }
  }
}

export default $iterableCurry($takeWhile);
