import iter from './iter'

export default function * zip (iterables, reuseEntry = false) {
  const iters = iterables.map(i => iter(i))
  let zipped = []
  while (true) {
    zipped = reuseEntry ? zipped : []
    zipped.length = 0

    for (const iter of iters) {
      const {done, value} = iter.next()
      if (done) return
      zipped.push(value)
    }
    yield zipped
  }
}
