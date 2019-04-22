import Heap from 'little-ds-toolkit/lib/heap'
import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncTakeSorted (comparator, number, iterable) {
  const heap = new Heap(comparator)
  for await (const item of iterable) {
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

export default asyncIterableCurry(asyncTakeSorted, { variadic: false }, 1, 2)
