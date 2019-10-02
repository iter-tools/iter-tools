import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $tap(source, func) {
  let c = 0;
  $await;
  for (const item of source) {
    func(item, c++);
    yield item;
  }
}

export default $iterableCurry($tap);
