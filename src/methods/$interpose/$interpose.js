import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $interpose(source, interposed) {
  let first = true;
  $await;
  for (const sourceValue of source) {
    if (!first) {
      yield interposed;
    }
    yield sourceValue;
    first = false;
  }
}

export default $iterableCurry($interpose);
