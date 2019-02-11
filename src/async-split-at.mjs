import { asyncIterableCurry } from './internal/async-iterable'

function asyncSplitAt (index, iterable) {
  const iter = iterable[Symbol.asyncIterator]()
  let firstRequestedIndex = -1
  let firstCache = null
  let firstCacheStart = null
  let firstDone = false
  let secondDiscarded = false
  let done = false

  async function cleanUp () {
    if (!done && typeof iter.return === 'function') {
      done = true
      await iter.return()
    }
  }

  async function * first () {
    try {
      while (firstRequestedIndex < index - 1) {
        firstRequestedIndex++

        const cacheItem = firstCache && firstCache[firstRequestedIndex - firstCacheStart]

        if (done && !cacheItem) break

        const item = await (cacheItem || iter.next())

        done = done || item.done

        if (item.done) break

        yield item.value
      }
    } finally {
      firstDone = true
      if (firstRequestedIndex !== index - 1 || secondDiscarded) {
        await cleanUp()
      }
    }
  }

  async function * second () {
    try {
      if (firstRequestedIndex < index) {
        firstCacheStart = firstRequestedIndex + 1
        firstCache = new Array(index - firstCacheStart)

        let i = 1
        while (firstRequestedIndex + i - firstCacheStart < firstCache.length) {
          const itemPromise = iter.next()

          firstCache[firstRequestedIndex + i - firstCacheStart] = itemPromise

          const item = await itemPromise

          done = item.done
          if (done) break
          i++
        }
      }

      while (!done) {
        const item = await iter.next()

        done = item.done
        if (done) break

        yield item.value
      }
    } finally {
      await cleanUp()
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

export default asyncIterableCurry(asyncSplitAt)
