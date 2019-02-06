import { iterableCurry } from './internal/iterable'
import CircularBuffer from './internal/circular-buffer'
import chain from './chain'
import repeat from './repeat'

function * cursor ({ size, trailing, filler }, iterable) {
  const circular = new CircularBuffer(size)
  if (typeof filler !== 'undefined') {
    circular.array.fill(filler)
  }
  if (trailing) {
    let index = 0
    for (const item of chain(iterable, repeat(filler, size - 1))) {
      circular.push(item)
      if (index + 1 >= size) {
        yield Array.from(circular)
      }
      index++
    }
  } else {
    for (const item of iterable) {
      circular.push(item)
      yield Array.from(circular)
    }
  }
}

export default iterableCurry(cursor)
