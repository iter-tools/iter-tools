import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $Bisector } from '../../internal/$bisector.js';
import { __wrap } from '../$wrap/wrap.js';

$async;
export function* $conditionStrategy(split, { predicate }, source) {
  let i = 0;
  let splat = false;
  $await;
  for (const value of source) {
    if (!splat && $await(predicate(value, i++))) {
      yield split;
      splat = true;
    }
    yield value;
  }
}

export function $__splitWhen(source, predicate) {
  return new $Bisector(source, $conditionStrategy, { predicate });
}

export const $splitWhen = /*#__PURE__*/ $iterableCurry(
  function $splitWhen(source, predicate) {
    return __wrap($__splitWhen(source, predicate));
  },
  {
    forceSync: true,
  },
);
