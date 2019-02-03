import Heap from 'little-ds-toolkit/lib/heap'
import { ensureIterable } from './internal/iterable'

function * takeSorted (number, comparator, iterable) {
  const heap = new Heap(comparator)
  for (const item of ensureIterable(iterable)) {
    heap.push(item)
    if (heap.size() > number) {
      heap.pop()
    }
  }
  const len = heap.size()
  for (let i = 0; i < len; i++) {
    yield heap.pop()
  }
}

export default function curriedTakeSorted (number, comparator, iterable) {
  if (arguments.length === 2) {
    if (comparator[Symbol.iterator]) {
      return takeSorted(number, undefined, comparator)
    } else {
      return iterable => takeSorted(number, comparator, iterable)
    }
  } else if (arguments.length === 1) {
    return iterable => takeSorted(number, undefined, iterable)
  }
  return takeSorted(number, comparator, iterable)
}
