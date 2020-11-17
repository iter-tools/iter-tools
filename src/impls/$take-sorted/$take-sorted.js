import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { defaultCompare } from '../../internal/compare.js';
import { Heap } from './internal/heap.js';

$async;
export function* $takeSorted(source, n = Infinity, comparator = defaultCompare) {
  const heap = new Heap(comparator);

  $await;
  for (const item of source) {
    heap.push(item);
    if (heap.size > n) {
      heap.pop();
    }
  }

  while (heap.size) {
    yield heap.pop();
  }
}

export default /*#__PURE__*/ $iterableCurry($takeSorted, {
  minArgs: 0,
  maxArgs: 2,
  validateArgs(args) {
    if (typeof args[1] === 'number') {
      args[0] = args[1];
      args[1] = undefined;
    }
  },
});
