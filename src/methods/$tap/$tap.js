import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $tap(source, callback) {
  let c = 0;
  $await;
  for (const item of source) {
    callback(item, c++);
    yield item;
  }
}

export default $iterableCurry($tap);
