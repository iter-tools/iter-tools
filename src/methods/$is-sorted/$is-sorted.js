import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { defaultCompareOrder } from '../../internal/order';

$async;
export function $isSorted(iterable, compareEquality = defaultCompareOrder) {
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

      if (!done && compareEquality(a, b) > 0) {
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
