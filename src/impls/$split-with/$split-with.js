import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $spliterate } from '../$spliterate/$spliterate.js';

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

export default /*#__PURE__*/ $iterableCurry($splitWith);
