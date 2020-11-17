import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $Bisector } from '../../internal/$bisector.js';
import { wrap } from '../../internal/wrap.js';

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

export function $splitWhen(source, predicate) {
  return wrap(new $Bisector(source, $conditionStrategy, { predicate }));
}

export default /*#__PURE__*/ $iterableCurry($splitWhen, {
  forceSync: true,
});
