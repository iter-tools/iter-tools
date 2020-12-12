import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $Bisector } from '../../internal/$bisector.js';
import { $__toArray } from '../$to-array/$to-array.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';

$async;
export function* $indexStrategy(split, { at }, source) {
  const _source = at < 0 ? $await($__toArray(source)) : source;
  const idx = at < 0 ? _source.length + at : at;
  const peekr = $await($__peekerate(_source));

  try {
    while (!peekr.done) {
      if (peekr.index === idx) yield split;
      yield peekr.value;
      $await(peekr.advance());
    }
  } finally {
    peekr.return();
  }
}

$async;
export function* $conditionStrategy(split, { at: predicate }, source) {
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

export function $__bisect(source, at) {
  const strategy = typeof at === 'number' ? $indexStrategy : $conditionStrategy;
  return new $Bisector(source, strategy, { at });
}

export const $bisect = /*#__PURE__*/ $iterableCurry($__bisect, {
  forceSync: true,
});
