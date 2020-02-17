import { $async, $await } from '../../../generate/async.macro';

import Heap from 'little-ds-toolkit/lib/heap';
import { $iterableCurry } from '../../internal/$iterable';
import { defaultCompareOrder } from '../../internal/order';

$async;
export function* $takeSorted(source, n, compareEquality = defaultCompareOrder) {
  const heap = new Heap(compareEquality);
  $await;
  for (const item of source) {
    heap.push(item);
    if (heap.size() > n) {
      heap.pop();
    }
  }
  const len = heap.size();
  for (let i = 0; i < len; i++) {
    yield heap.pop();
  }
}

export default $iterableCurry($takeSorted, {
  minArgs: 1,
  maxArgs: 2,
});
