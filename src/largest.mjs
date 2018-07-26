import ensureIterable from './internal/ensure-iterable'
import Heap from 'little-ds-toolkit/lib/heap'

function * largest (number, comp, iterable) {
  const heap = new Heap(comp)
  for (const item of ensureIterable(iterable)) {
    heap.push(item)
    if (heap.size() > number) {
      heap.pop()
    }
  }
  const len = heap.size()
  for (var i = 0; i < len; i++) {
    yield heap.pop()
  }
}

export default function curriedLargest (number, comp, iterable) {
  if (arguments.length === 3) {
    return largest(number, comp, iterable)
  } else if (arguments.length === 2) {
    if (Symbol.iterator in comp) {
      iterable = comp
      comp = undefined
      return largest(number, comp, iterable)
    } else {
      return iterable => largest(number, comp, iterable)
    }
  } else {
    return iterable => largest(number, comp, iterable)
  }
}
