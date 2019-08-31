import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $find(iterable, notFoundValue, func) {
  let c = 0;
  $await;
  for (const item of iterable) {
    if ($await(func(item, c++))) {
      return item;
    }
  }
  return notFoundValue;
}

export default $iterableCurry($find, {
  reduces: true,
  minArgs: 1,
  maxArgs: 2,
});
