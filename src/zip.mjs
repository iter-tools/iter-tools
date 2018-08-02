import ensureIterable from './internal/ensure-iterable'

function closeIterators (iters, except) {
  let c = 0
  for (const iter of iters) {
    if (c === except) {
      c++
      continue
    }
    if (typeof iter.return === 'function') iter.return()
    c++
  }
}

export default function * zip (...iterables) {
  const iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
  while (true) {
    const zipped = new Array(iterables.length)
    let i = 0
    let c = 0
    for (const iter of iters) {
      const {done, value} = iter.next()
      if (done) {
        closeIterators(iters, c) // clean up unfinished iterators
        return
      }
      c++
      zipped[i++] = value
    }
    yield zipped
  }
}
