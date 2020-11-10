import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $spliterate } from '../$spliterate/$spliterate';

$async;
function* $predicateSpliterator(split, { predicate }, source) {
  let i = 0;
  $await;
  for (const value of source) {
    yield $await(predicate(value, i++)) ? split : value;
  }
}

export function $splitWith(source, predicate) {
  return $spliterate(source, $predicateSpliterator, { predicate });
}

export default $iterableCurry($splitWith);
