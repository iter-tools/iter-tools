import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';

$async;
export function* $filter(source, predicate) {
  let c = 0;
  $await;
  for (const item of source) {
    if ($await(predicate(item, c++))) {
      yield item;
    }
  }
}

export default $iterableCurry($filter);
