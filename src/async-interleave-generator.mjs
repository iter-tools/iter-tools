import { ensureAsyncIterable } from './internal/async-iterable'
import raceTo from './internal/race-to'
import map from './map'

class AsyncInterleaveBuffer {
  constructor (iterator) {
    this._iterator = iterator
    this._nextPromise = iterator.next()
  }

  async take () {
    const next = await this._nextPromise
    if (next.done) {
      return undefined
    }

    this._nextPromise = this._iterator.next()
    return next.value
  }

  async canTake () {
    return (await this._nextPromise).done ? null : this
  }
}

export default function interleaveGenerator (generatorFn) {
  return (...iterables) => {
    return (async function * () {
      const iterators = map(iterable => ensureAsyncIterable(iterable)[Symbol.asyncIterator](), iterables)
      const buffers = Array.from(map(iterator => new AsyncInterleaveBuffer(iterator), iterators))
      const canTakeAny = () => raceTo(Boolean, false, map(buffer => buffer.canTake(), buffers))
      try {
        yield * generatorFn(canTakeAny, ...buffers)
      } finally {
        for (const buffer of buffers) {
          if (await buffer.canTake() && typeof buffer._iterator.return === 'function') {
            await buffer._iterator.return()
          }
        }
      }
    })()
  }
}
