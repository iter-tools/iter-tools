import Heap from 'little-ds-toolkit/lib/heap'
import { ensureAsyncIterable } from './internal/async-iterable'

async function * asyncTakeSorted (number, comparator, iterable) {
  const heap = new Heap(comparator)
  for await (const item of ensureAsyncIterable(iterable)) {
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

export default function curriedAsyncTakeSorted (number, comparator, iterable) {
  if (arguments.length === 2) {
    if (comparator[Symbol.asyncIterator] || comparator[Symbol.iterator]) {
      return asyncTakeSorted(number, undefined, comparator)
    } else {
      return iterable => asyncTakeSorted(number, comparator, iterable)
    }
  } else if (arguments.length === 1) {
    return iterable => asyncTakeSorted(number, undefined, iterable)
  }
  return asyncTakeSorted(number, comparator, iterable)
}
