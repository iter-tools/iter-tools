import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $interpose(source, interposeItem) {
  let first = true;
  $await;
  for (const item of source) {
    if (!first) {
      yield interposeItem;
    }
    yield item;
    first = false;
  }
}

export default $iterableCurry($interpose);
