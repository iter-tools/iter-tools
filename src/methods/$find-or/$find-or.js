import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $findOr(iterable, notFoundValue, func) {
  let c = 0;
  $await;
  for (const item of iterable) {
    if ($await(func(item, c++))) {
      return item;
    }
  }
  return notFoundValue;
}

export default $iterableCurry($findOr, {
  reduces: true,
});
