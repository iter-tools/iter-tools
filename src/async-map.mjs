import { asyncIterableCurry, asyncify } from './internal/async-iterable'

import CircularBuffer from './internal/circular-buffer'

class ParallelMapper {
  constructor (iterable, mapFn, concurrency) {
    this.iter = asyncify(iterable)[Symbol.asyncIterator]()
    this.buffer = new CircularBuffer(concurrency)
    this.mapFn = mapFn
    this.done = false
    this.previousUnresolvedPromise = null
  }

  next () {
    const { iter, buffer, done, mapFn } = this

    if (buffer.isFull() || done) {
      const bufferValue = buffer.shift()

      if (!done) {
        // Keep the buffer full!
        buffer.push(this.next())
      }
      return bufferValue
    }

    const promise = iter.next()
      .then(async item => {
        // We are guaranteed by the async generator impl that this then block
        // will be executed in order
        const { previousUnresolvedPromise } = this

        this.previousUnresolvedPromise = promise

        let mapPromise
        if (item.done) {
          this.done = true
        } else {
          mapPromise = mapFn(item.value)

          if (!buffer.isFull()) {
            // Go on filling up the buffer in the background
            // Note that we don't await the last generator item before requesting the next one.
            // This makes the code "eager". It works because async generators queue `next` calls
            // internally, as if they were requests. If there is a request in the queue, they
            // begin to generate the next item as soon as the last one is finished, whether or not
            // anybody has tried to consume it from ParallelMapper yet. This is what gives us
            // us parallelism. Without the ability to read ahead in the source, we would have
            // to wait until we had produced one mapped item until our consumer could call our
            // next method again triggering another source fetch. This would result in completely
            // serial behavior.
            buffer.push(this.next())
          }
        }

        let mappedValue
        if (!item.done) {
          mappedValue = await mapPromise
        }

        if (previousUnresolvedPromise) {
          // Ensure we don't emit parallelized items out of order
          await previousUnresolvedPromise
        }

        if (item.done) {
          return item
        } else {
          return { value: mappedValue, done: false }
        }
      })

    return promise
  }

  [Symbol.asyncIterator] () { return this }

  return () {
    if (typeof this.iter.return === 'function') {
      return this.iter.return()
    }
  }
}

async function * asyncMap (concurrency = 1, func, iterable) {
  let c = 0

  const runner = new ParallelMapper(iterable, async item => func(item, c++), concurrency)

  for await (const value of runner) {
    yield value
  }
}

export default asyncIterableCurry(asyncMap, false, 1, 2)
