import { ensureIterable } from './internal/iterable'

export default function * zipLongest (...iterables) {
  const iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
  try {
    while (true) {
      let numberOfExhausted = 0
      const zipped = new Array(iterables.length)
      let i = 0
      for (const iter of iters) {
        const { done, value } = iter.next()
        if (done) {
          numberOfExhausted++
        }
        zipped[i++] = done ? undefined : value
      }
      if (iters.length === numberOfExhausted) {
        return
      }
      yield zipped
    }
  } finally {
    for (const iter of iters) {
      if (typeof iter.return === 'function') iter.return()
    }
  }
}
