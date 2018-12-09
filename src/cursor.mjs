import enumerate from './enumerate'
import CircularBuffer from './internal/circular-buffer'

function * cursor (size, iterable) {
  const circular = new CircularBuffer(size)
  let yielded = false
  for (const [index, item] of enumerate(iterable)) {
    circular.push(item)
    if (index + 1 >= size) {
      yielded = true
      yield Array.from(circular)
    }
  }
  if (!yielded) {
    yield Array.from(circular)
  }
}

export default function curriedCursor (size, iterable) {
  if (arguments.length === 1) {
    return iterable => cursor(size, iterable)
  }
  return cursor(size, iterable)
}
