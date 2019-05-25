import { asyncify } from './async-iterable'
import CircularBuffer from './circular-buffer'

export default class ParallelRunner {
  constructor (iterable, mapFn, concurrency) {
    this.iter = asyncify(iterable)[Symbol.asyncIterator]()
    this.buffer = new CircularBuffer(concurrency - 1)
    this.mapFn = mapFn
    this.done = false
  }

  next () {
    const { iter, buffer, done, mapFn } = this

    const promise = iter.next()
      .then(async item => {
        if (item.done) {
          this.done = true
          return item
        } else {
          return { value: await mapFn(item.value), done: false }
        }
      })

    const displacedPromise = buffer.push(promise)

    if (displacedPromise) {
      // Base case: buffer is full
      return displacedPromise
    } else {
      if (done) {
        // Base case: iterable ran out.
        // Note that we may still make a few more next calls while waiting
        // for the first promise which is going to resolve { done: true },
        // but this should be OK.
        return promise
      } else {
        // Recurse, filling the buffer with items from the source
        return this.next()
      }
    }
  }

  [Symbol.asyncIterator] () { return this }

  return () {
    if (typeof this.iter.return === 'function') {
      return this.iter.return()
    }
  }

  throw (e) {
    console.error(e)
  }
}
