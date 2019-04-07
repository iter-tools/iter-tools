import { iterableCurry } from './internal/iterable'
import CircularBuffer from './internal/circular-buffer'
import concat from './concat'
import repeat from './repeat'

function * cursor ({ size, trailing, filler }, iterable) {
  const circular = new CircularBuffer(size)

  circular.fill(filler)

  if (trailing) {
    let index = 0
    for (const item of concat(iterable, repeat(filler, size - 1))) {
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
