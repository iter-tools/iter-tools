import { iterableCurry } from './internal/iterable'

function splitAt (index, iterable) {
  const iter = iterable[Symbol.iterator]()
  let firstRequestedIndex = -1
  let firstCache = null
  let firstCacheStart = null
  let firstDone = false
  let secondDiscarded = false
  let done = false

  function cleanUp () {
    if (!done && typeof iter.return === 'function') {
      done = true
      iter.return()
    }
  }

  function * first () {
    try {
      while (firstRequestedIndex < index - 1) {
        firstRequestedIndex++

        const cacheItem = firstCache && firstCache[firstRequestedIndex - firstCacheStart]

        if (done && !cacheItem) break

        const item = cacheItem || iter.next()

        done = done || item.done

        if (item.done) break

        yield item.value
      }
    } finally {
      firstDone = true
      if (firstRequestedIndex !== index - 1 || secondDiscarded) {
        cleanUp()
      }
    }
  }

  function * second () {
    try {
      if (firstRequestedIndex < index) {
        firstCacheStart = firstRequestedIndex + 1
        firstCache = new Array(index - firstCacheStart)

        let i = 1
        while (firstRequestedIndex + i - firstCacheStart < firstCache.length) {
          const item = iter.next()

          done = item.done
          if (done) break

          firstCache[firstRequestedIndex + i - firstCacheStart] = item
          i++
        }
      }

      while (!done) {
        const item = iter.next()

        done = item.done
        if (done) break

        yield item.value
      }
    } finally {
      cleanUp()
    }
  }

  return (function * () {
    let emittedSecond = false
    try {
      yield first()
      emittedSecond = true
      yield second()
    } finally {
      if (firstDone && !emittedSecond) {
        cleanUp()
      }
      secondDiscarded = !emittedSecond
    }
  })()
}

export default iterableCurry(splitAt)
