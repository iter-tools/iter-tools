import { asyncIterableCurry } from './internal/async-iterable'
import asyncConcat from './async-concat'
import repeat from './repeat'

import CircularBuffer from './internal/circular-buffer'

async function * asyncCursor ({ size, trailing, filler }, iterable) {
  const circular = new CircularBuffer(size)

  circular.fill(filler)

  iterable = iterable[Symbol.asyncIterator]()

  if (trailing) {
    let index = 0
    for await (const item of asyncConcat(iterable, repeat(filler, size - 1))) {
      circular.push(item)
      if (index + 1 >= size) {
        yield circular.readOnlyCopy
      }
      index++
    }
  } else {
    for await (const item of iterable) {
      circular.push(item)
      yield circular.readOnlyCopy
    }
  }
}

export default asyncIterableCurry(asyncCursor)
