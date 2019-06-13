import { $async, $await } from '../generate/async.macro';

import { $iterableCurry } from './internal/$iterable';

$async;
function $some(func, iterable) {
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
