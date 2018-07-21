import ensureIterable from './internal/ensure-iterable'

export default function * zipLongest (...iterables) {
  const iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
  while (true) {
    let numberOfExausted = 0
    const zipped = new Array(iterables.length)
    let i = 0
    for (const iter of iters) {
      const { done, value } = iter.next()
      if (done) {
        numberOfExausted++
      }
      zipped[i++] = done ? undefined : value
    }
    if (iters.length === numberOfExausted) {
      return
    }
    yield zipped
  }
}
