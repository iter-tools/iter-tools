import { $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { $zipAll } from '../$zip-all/$zip-all.js';
import { simpleSlice } from '../$slice/slice.js';

const none = Symbol('none');
const zipAllConfig = { filler: none };

$async;
export function $equal(iterables) {
  if (iterables.length <= 1) {
    return true;
  }

  $await;
  for (const stepValues of $zipAll(iterables, zipAllConfig)) {
    const firstValue = stepValues[0];
    for (const value of simpleSlice(stepValues, 1, Infinity)) {
      if (value !== firstValue) {
        return false;
      }
    }
  }

  return true;
}

export default /*#__PURE__*/ $iterableCurry($equal, {
  reduces: true,
  variadic: true,
});
