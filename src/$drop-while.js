import { $async, $await } from '../generate/async.macro';

import { $iterableCurry } from './internal/$iterable';

$async;
function* $dropWhile(func, iterable) {
  let drop = true;
  let c = 0;
  $await;
  for (const item of iterable) {
    if (!drop) {
      yield item;
    } else {
      drop = $await(func(item, c++));
      if (!drop) {
        yield item;
      }
    }
  }
}

export default $iterableCurry($dropWhile);
