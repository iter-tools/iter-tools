import Heap from 'little-ds-toolkit/lib/heap'
import { iterableCurry } from './internal/iterable'

function * takeSorted (comparator, number, iterable) {
  const heap = new Heap(comparator)
  for (const item of iterable) {
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

export default iterableCurry(takeSorted, 2, 3)
