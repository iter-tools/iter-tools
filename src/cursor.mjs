import { iterableCurry } from './internal/iterable'
import CircularBuffer from './internal/circular-buffer'
import chain from './chain'
import repeat from './repeat'

function * cursor ({ size, trailing, filler }, iterable) {
  const circular = new CircularBuffer(size)

  circular.fill(filler)

  if (trailing) {
    let index = 0
    for (const item of chain(iterable, repeat(filler, size - 1))) {
      circular.push(item)
      if (index + 1 >= size) {
        yield circular.readOnlyCopy
      }
      index++
    }
  } else {
    for (const item of iterable) {
      circular.push(item)
      yield circular.readOnlyCopy
    }
  }
}

export default iterableCurry(cursor)
