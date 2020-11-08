import { $async, $await } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import defaultCompare from '../../internal/compare';
import { $peekerate } from '../$peekerate/$peekerate';

$async;
export function $isSorted(iterable, comparator = defaultCompare) {
  const peekr = $await($peekerate(iterable));

  while (!peekr.done) {
    const { value } = peekr;
    $await(peekr.advance());

    if (!peekr.done && comparator(value, peekr.value) > 0) {
      return false;
    }
  }
  return true;
}

export default $iterableCurry($isSorted, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
