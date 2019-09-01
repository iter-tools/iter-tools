import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $consume(iterable, func = () => {}) {
  let c = 0;
  $await;
  for (const item of iterable) {
    $await(func(item, c++));
  }
}

export default $iterableCurry($consume, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
