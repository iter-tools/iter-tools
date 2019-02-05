import ensureAsyncIterable from './internal/ensure-async-iterable'
import curry from './internal/curry'

function asyncSplitAt (index, iterable) {
  const iter = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()
  let position = 0
  let firstCache = null
  let firstCacheStart = null
  let done = false

  async function cleanUp () {
    if (!done && typeof iter.return === 'function') {
      await iter.return()
    }
  }

  async function * first () {
    try {
      while (!done) {
        if (firstCache) {
          yield firstCache[position - firstCacheStart]
        } else {
          const item = await iter.next()
          done = item.done
          if (!done) {
            yield item.value
          }
        }
        position++
      }
    } finally {
      if (position !== index - 1) {
        await cleanUp()
      }
    }
  }

  async function * second () {
    try {
      if (position < index - 1) {
        firstCacheStart = position
        firstCache = new Array(index - position)
        for (let i = position; i < index; i++) {
          const item = await iter.next()
          done = item.done
          if (!done) {
            firstCache[i] = item.value
          }
        }
        position = index
      }

      while (!done) {
        const item = await iter.next()
        done = item.done
        position++
        if (!done) {
          yield item.value
        }
      }
    } finally {
      await cleanUp()
    }
  }

  return [first(), second()]
}

export default curry(asyncSplitAt)
