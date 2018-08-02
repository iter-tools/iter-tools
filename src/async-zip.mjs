import ensureAsyncIterable from './internal/ensure-async-iterable'
import map from './map'

export default async function * zip (...iterables) {
  const iters = iterables.map(arg => ensureAsyncIterable(arg)[Symbol.asyncIterator]())
  try {
    while (true) {
      const results = await Promise.all(map(iter => iter.next(), iters))
      const done = results.some(r => r.done)

      if (done) {
        let c = 0 // clean up unfinished iterators
        for (const iter in iters) {
          if (results[c].done) {
            c++
            continue
          }
          if (typeof iter.return === 'function') iter.return()
          c++
        }
        return
      }
      yield results.map(r => r.value)
    }
  } finally {
    for (const iter in iters) {
      if (typeof iter.return === 'function') iter.return()
    }
  }
}
