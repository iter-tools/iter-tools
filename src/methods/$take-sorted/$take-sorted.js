import { $async, $await } from '../../../generate/async.macro';

import Heap from 'little-ds-toolkit/lib/heap';
import { $iterableCurry } from '../../internal/$iterable';
import defaultCompare from '../../internal/compare';

$async;
export function* $takeSorted(source, n = Infinity, comparator = defaultCompare) {
  const heap = new Heap(comparator);
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
  minArgs: 0,
  maxArgs: 2,
  validateArgs(args) {
    if (typeof args[1] === 'number') {
      args[0] = args[1];
      args[1] = undefined;
    }
  },
});
