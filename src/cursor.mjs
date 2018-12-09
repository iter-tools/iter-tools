import ensureIterable from './internal/ensure-iterable'
import chain from './chain'
import repeat from './repeat'

import CircularBuffer from './internal/circular-buffer'

function * cursor ({ size, trailing }, iterable) {
  const circular = new CircularBuffer(size)
  if (trailing) {
    let index = 0
    for (const item of chain(iterable, repeat(undefined, size - 1))) {
      circular.push(item)
      if (index + 1 >= size) {
        yield Array.from(circular)
      }
      index++
    }
  } else {
    for (const item of ensureIterable(iterable)) {
      circular.push(item)
      yield Array.from(circular)
    }
  }
}

export default function curriedCursor (size, iterable) {
  if (arguments.length === 1) {
    return iterable => cursor(size, iterable)
  }
  return cursor(size, iterable)
}
