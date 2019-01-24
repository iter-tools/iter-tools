import tee from './tee'
import ensureIterable from './internal/ensure-iterable'

const _queue = Symbol('queue')
const _done = Symbol('done')
const _count = Symbol('count')
const _position = Symbol('position')
const _sourceIterator = Symbol('sourceIterator')
const _returnItem = Symbol('returnValue')
const _forkGenerator = Symbol('forkGenerator')
const _forksReturned = Symbol('forksReturned')
const _emittedReturnValue = Symbol('emittedReturnValue')

class ForkedIterable {
  constructor (forkGenerator) {
    this[_forkGenerator] = forkGenerator

    /**
     * True if this iterator has returned prior to exhausting the source
     */
    this[_done] = false
    /**
     * The number of items from the source iterable that this fork has emitted
     * thus far
     */
    this[_position] = 0
    /**
     * True if this iterator has emitted a return value. The fork should emit
     * the return value of the source iterator once if the source iterator
     * returned a value, which matches generator behavior.
     */
    this[_emittedReturnValue] = false
  }

  next () {
    const forkGenerator = this[_forkGenerator]
    const done = this[_done]

    const position = this[_position];
    this[_position]++

    if (done || forkGenerator[_returnItem]) {
      // There are no more items to emit

      if (done || this[_emittedReturnValue]) {
        return {
          value: undefined,
          done: true
        }
      } else {
        this[_emittedReturnValue] = true
        return forkGenerator[_returnItem]
      }
    } else {
      // There is definitely some item to emit

      const sourceIterator = forkGenerator[_sourceIterator]
      const queue = forkGenerator[_queue]

      if (position < queue.length) {
        return queue[position]
      } else {
        const iteratorItem = sourceIterator.next()

        if (iteratorItem.done) {
          forkGenerator[_returnItem] = iteratorItem
          this[_emittedReturnValue] = true
        } else {
          queue.push(iteratorItem)
        }
        return iteratorItem
      }
    }
  }

  return (returnVal) {
    const forkGenerator = this[_forkGenerator]
    forkGenerator[_forksReturned]++

    this[_done] = true
    this[_emittedReturnValue] = true

    if (!forkGenerator[_returnItem]) {
      if (
        forkGenerator[_done] &&
        forkGenerator[_forksReturned] === forkGenerator[_count]
      ) {
        // All forks have returned prematurely, so clean up the source
        forkGenerator[_sourceIterator].return()
      }
    }

    return {
      done: true,
      value: returnVal
    }
  }

  [Symbol.iterator] () {
    return this
  }
}

class ForkGenerator {
  constructor (source) {
    this[_sourceIterator] = ensureIterable(source)[Symbol.iterator]()

    /**
     * Cache of all values emitted so far from the source
     */
    this[_queue] = []
    /**
     * Whether the fork iterable itself is done, which is to say that no more
     * new forks of the source iterable will be created
     */
    this[_done] = false
    /**
     * `null` if the source iterator is not exhausted, otherwise the
     * `{done: true, ...}` item that it yielded
     */
    this[_returnItem] = null
    /**
     * The number of forks created
     */
    this[_count] = 0
    /**
     * The number of forks which returned. Used to ensure that `source.return()`
     * is still called when all forks return before exhausting the source.
     *
     * It may not ever reach `count`, nor need it. If count is not reached, that 
     * means that one fork terminated by exhausting the source, in which case
     * there is no need for a call to `source.return()`
     */
    this[_forksReturned] = 0
  }

  next () {
    if (this[_done]) {
      return {
        value: undefined,
        done: true
      }
    } else {
      this[_count]++
      return {
        value: new ForkedIterable(this),
        done: false
      }
    }
  }

  /**
   * ForkGenerator is an infinite generator, so for purposes of correctness it
   * is imperative to avoid leaks that this return method be called when no more
   * forks are needed.
   */
  return (returnVal) {
    this[_done] = true
    return {
      done: true,
      value: returnVal
    }
  }

  [Symbol.iterator] () {
    return this
  }
}

export default function fork (iterable, count = Infinity) {
  return count === Infinity ? new ForkGenerator(iterable) : tee(iterable, count)
}
