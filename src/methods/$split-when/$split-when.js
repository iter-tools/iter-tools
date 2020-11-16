import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $Bisector } from '../../internal/$bisector';
import { wrap } from '../../internal/wrap';

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

export default $iterableCurry($splitWhen, {
  forceSync: true,
});
