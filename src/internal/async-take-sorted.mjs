import ensureIterable from './ensure-async-iterable'
import Heap from 'little-ds-toolkit/lib/heap'
import _iteratee from 'lodash/iteratee'

export default async function * asyncTakeSorted (number, expr, comparator, iterable) {
  const getKey = _iteratee(expr)
  const heap = new Heap(comparator)

  for await (const item of ensureIterable(iterable)) {
    const key = getKey(item)
    heap.push({ key, item })
    if (heap.size() > number) {
      heap.pop()
    }
  }
  const len = heap.size()
  for (var i = 0; i < len; i++) {
    yield heap.pop().item
  }
}
