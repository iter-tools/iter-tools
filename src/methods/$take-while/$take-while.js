import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $takeWhile(source, predicate) {
  let take = true;
  let c = 0;

  $await;
  for (const item of source) {
    take = $await(predicate(item, c++));
    if (take) {
      yield item;
    } else {
      break;
    }
  }
}

export default $iterableCurry($takeWhile);
