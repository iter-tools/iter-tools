import AdvancedMapInitialized from 'advanced-map-initialized'
import map from './map'
import range from './range'
import ensureIterable from './internal/ensure-iterable'

export default function fork (iterable) {
  const queue = []
  const iterator = ensureIterable(iterable)[Symbol.iterator]()
  let exhausted = 0

  function * part () {
    let cursor = 0

    try {
      while (true) {
        while (cursor < queue.length) {
          yield queue[cursor]
          cursor += 1
        }

        const { value, done } = iterator.next()
        if (done) break

        queue.push(value)
      }
    } finally {
      exhausted++
      if (exhausted === queue.length) {
        if (typeof iterator.return === 'function') iterator.return()
      }
    }
  }

  const resultMap = new AdvancedMapInitialized(Map, part)

  return map(
    index => resultMap.get(index),
    range()
  )
}
