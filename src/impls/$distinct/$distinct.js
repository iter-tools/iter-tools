import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__distinct(source, selector) {
  const set = new Set();
  $await;
  for (const value of source) {
    const key = selector ? selector(value) : value;
    if (set.has(key)) {
      continue;
    }

    set.add(key);
    yield value;
  }
}

export const $distinct = $iterableCurry($__distinct, {
  minArgs: 0,
  maxArgs: 1,
});
