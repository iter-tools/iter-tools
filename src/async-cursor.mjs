import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'
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

export default curry(asyncCursor)
