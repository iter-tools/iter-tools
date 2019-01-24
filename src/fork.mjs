import tee from './tee'
import ensureIterable from './internal/ensure-iterable'

const _queue = Symbol('queue')
const _done = Symbol('done')
const _count = Symbol('count')
const _position = Symbol('position')
const _sourceIterator = Symbol('sourceIterator')
const _returnItem = Symbol('returnValue')
const _forkIterable = Symbol('forkIterable')
const _forksReturned = Symbol('forksReturned')
const _emittedReturnValue = Symbol('emittedReturnValue')

class ForkedIterable {
  constructor (forkIterable) {
    this[_forkIterable] = forkIterable
    this[_done] = false
    this[_position] = -1
    this[_emittedReturnValue] = false
  }

  next () {
    const forkIterable = this[_forkIterable]
    const done = this[_done]

    this[_position]++

    if (done || forkIterable[_returnItem]) {
      if (done || this[_emittedReturnValue]) {
        return {
          value: undefined,
          done: true
        }
      } else {
        this[_emittedReturnValue] = true
        return forkIterable[_returnItem]
      }
    } else {
      const position = this[_position]
      const sourceIterator = forkIterable[_sourceIterator]
      const queue = forkIterable[_queue]

      if (position < queue.length) {
        return queue[position]
      } else {
        const iteratorItem = sourceIterator.next()

        if (iteratorItem.done) {
          forkIterable[_returnItem] = iteratorItem
        } else {
          queue.push(iteratorItem)
        }
        return iteratorItem
      }
    }
  }

  return (returnVal) {
    const forkIterable = this[_forkIterable]
    forkIterable[_forksReturned]++

    this[_done] = true

    if (!forkIterable[_returnItem]) {
      if (forkIterable[_done] && forkIterable[_forksReturned] === forkIterable[_count]) {
        forkIterable[_sourceIterator].return()
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

class ForkIterable {
  constructor (source) {
    this[_sourceIterator] = ensureIterable(source)[Symbol.iterator]()
    this[_queue] = []
    this[_done] = false
    this[_returnItem] = null
    this[_count] = 0
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
  return count === Infinity ? new ForkIterable(iterable) : tee(iterable, count)
}
