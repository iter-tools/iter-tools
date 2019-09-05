import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import defaultCompare from '../../internal/compare';

$async;
export function $isSorted(iterable, comparator = defaultCompare) {
  let a;
  let b;
  let iter;
  let done;

  try {
    iter = iterable[$iteratorSymbol]();

    ({ done, value: b } = $await(iter.next()));

    while (!done) {
      a = b;
      ({ done, value: b } = $await(iter.next()));

      if (!done && comparator(a, b) > 0) {
        return false;
      }
    }
    return true;
  } finally {
    if (!done && typeof iter.return === 'function') {
      iter.return();
    }
  }
}

export default $iterableCurry($isSorted, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
