import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $dropWhile(source, predicate) {
  let drop = true;
  let c = 0;
  $await;
  for (const item of source) {
    if (!drop) {
      yield item;
    } else {
      drop = $await(predicate(item, c++));
      if (!drop) {
        yield item;
      }
    }
  }
}

export default $iterableCurry($dropWhile);
