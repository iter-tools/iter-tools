import ensureAsyncIterable from './internal/ensure-async-iterable'

export default async function * zipLongest (...iterables) {
  const iters = iterables.map(iterable => ensureAsyncIterable(iterable))
  while (true) {
    const results = await Promise.all(iters.map((iter) => iter.next()))
    const done = results.every((r) => r.done)
    if (done) return
    yield results.map((r) => r.done ? undefined : r.value)
  }
}
