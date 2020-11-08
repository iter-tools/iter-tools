import { $async, $await } from '../../../../generate/async.macro';

import { $spliterate } from '../../$spliterate/$spliterate';

$async;
function* $predicateSpliterator(split, { predicate }, source) {
  let i = 0;
  $await;
  for (const value of source) {
    yield $await(predicate(value, i++)) ? split : value;
  }
}

export function $iterableSplitWith(source, predicate) {
  return $spliterate(source, $predicateSpliterator, { predicate });
}
