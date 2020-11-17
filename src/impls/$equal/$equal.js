import { $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { $zipAll } from '../$zip-all/$zip-all.js';
import { simpleSlice } from '../$slice/slice.js';

const noItem = {};
const zipAllConfig = { filler: noItem };

$async;
export function $equal(iterables) {
  if (iterables.length <= 1) {
    return true;
  }

  $await;
  for (const allItems of $zipAll(iterables, zipAllConfig)) {
    const firstItem = allItems[0];
    for (const item of simpleSlice(allItems, 1, Infinity)) {
      if (item !== firstItem) {
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
