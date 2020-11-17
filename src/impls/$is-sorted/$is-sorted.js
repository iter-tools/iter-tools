import { $async, $await } from '../../../generate/async.macro.cjs';
import { $iterableCurry } from '../../internal/$iterable.js';
import { defaultCompare } from '../../internal/compare.js';
import { $peekerate } from '../$peekerate/$peekerate.js';

$async;
export function $isSorted(iterable, comparator = defaultCompare) {
  const peekr = $await($peekerate(iterable));

  while (!peekr.done) {
    const { value } = peekr;
    $await(peekr.advance());

    if (!peekr.done && comparator(value, peekr.value) > 0) {
      $await(peekr.return());
      return false;
    }
  }
  return true;
}

export default /*#__PURE__*/ $iterableCurry($isSorted, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
