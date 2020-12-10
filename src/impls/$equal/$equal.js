import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__zipAll } from '../$zip-all/$zip-all.js';
import { __sliceFromStart } from '../$slice/slice.js';

const none = Symbol('none');
const zipAllConfig = { filler: none };

$async;
export function $__equal(iterables, same = Object.is) {
  if (iterables.length <= 1) return true;

  $await;
  for (const stepValues of $__zipAll(iterables, zipAllConfig)) {
    const firstValue = stepValues[0];
    for (const value of __sliceFromStart(stepValues, 1)) {
      if (!same(value, firstValue)) return false;
    }
  }

  return true;
}

export const $equal = /*#__PURE__*/ $iterableCurry($__equal, {
  minArgs: 0,
  maxArgs: 1,
  variadic: true,
  reduces: true,
});
