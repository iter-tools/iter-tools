import ensureAsyncIterable from './internal/ensure-async-iterable'

export default async function * zipLongest (...iterables) {
  const iters = iterables.map(arg => ensureAsyncIterable(arg)[Symbol.asyncIterator]())
  try {
    while (true) {
      const results = await Promise.all(iters.map((iter) => iter.next()))
      const done = results.every((r) => r.done)
      if (done) return
      yield results.map((r) => r.done ? undefined : r.value)
    }
  } finally {
    for (const iter in iters) {
      if (typeof iter.return === 'function') iter.return()
    }
  }
}
