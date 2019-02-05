import ensureIterable from './internal/ensure-iterable'
import curry from './internal/curry'

function splitAt (index, iterable) {
  const iter = ensureIterable(iterable)[Symbol.iterator]()
  let position = 0
  let firstCache = null
  let firstCacheStart = null
  let done = false

  function cleanUp () {
    if (!done && typeof iter.return === 'function') {
      iter.return()
    }
  }

  function * first () {
    try {
      while (!done) {
        if (firstCache) {
          yield firstCache[position - firstCacheStart]
        } else {
          const item = iter.next()
          done = item.done
          if (!done) {
            yield item.value
          }
        }
        position++
      }
    } finally {
      if (position !== index - 1) {
        cleanUp()
      }
    }
  }

  function * second () {
    try {
      if (position < index - 1) {
        firstCacheStart = position
        firstCache = new Array(index - position)
        for (let i = position; i < index; i++) {
          const item = iter.next()
          done = item.done
          if (!done) {
            firstCache[i] = item.value
          }
        }
        position = index
      }

      while (!done) {
        const item = iter.next()
        done = item.done
        position++
        if (!done) {
          yield item.value
        }
      }
    } finally {
      cleanUp()
    }
  }

  return [first(), second()]
}

export default curry(splitAt)
