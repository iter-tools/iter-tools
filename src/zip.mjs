import ensureIterable from './internal/ensure-iterable'

export default function * zip (...iterables) {
  const iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
  while (true) {
    const zipped = new Array(iterables.length)
    let i = 0

    for (const iter of iters) {
      const {done, value} = iter.next()
      if (done) return
      zipped[i++] = value
    }
    yield zipped
  }
}
