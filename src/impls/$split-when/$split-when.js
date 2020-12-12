import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__spliterate } from '../$spliterate/$spliterate.js';

$async;
function* $predicateSpliterator(split, { predicate }, source) {
  let i = 0;
  $await;
  for (const value of source) {
    yield $await(predicate(value, i++)) ? split : value;
  }
}

export function $__splitWhen(source, predicate) {
  return $__spliterate(source, $predicateSpliterator, { predicate });
}

export const $splitWhen = /*#__PURE__*/ $iterableCurry($__splitWhen);
