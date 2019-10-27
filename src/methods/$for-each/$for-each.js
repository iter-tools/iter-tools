import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function $forEach(iterable, callback) {
  let c = 0;
  $await;
  for (const item of iterable) {
    $await(callback(item, c++));
  }
}

export default $iterableCurry($forEach, {
  reduces: true,
});
