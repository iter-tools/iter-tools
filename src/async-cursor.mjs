import ensureAsyncIterable from './internal/ensure-async-iterable'
import asyncChain from './async-chain'
import repeat from './repeat'

import CircularBuffer from './internal/circular-buffer'

async function * asyncCursor ({ size, trailing, filler }, iterable) {
  const circular = new CircularBuffer(size)
  if (typeof filler !== 'undefined') {
    circular.array.fill(filler)
  }
  if (trailing) {
    let index = 0
    for await (const item of asyncChain(iterable, repeat(filler, size - 1))) {
      circular.push(item)
      if (index + 1 >= size) {
        yield Array.from(circular)
      }
      index++
    }
  } else {
    for await (const item of ensureAsyncIterable(iterable)) {
      circular.push(item)
      yield Array.from(circular)
    }
  }
}

export default function curriedAsyncCursor (size, iterable) {
  if (arguments.length === 1) {
    return iterable => asyncCursor(size, iterable)
  }
  return asyncCursor(size, iterable)
}
