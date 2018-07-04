import iter from './iter'

export default function * zipLongest (filler, iterables, reuseEntry = false) {
  const iters = iterables.map(i => iter(i))
  let zipped = []
  while (true) {
    let numberOfExausted = 0
    zipped = reuseEntry ? zipped : []
    zipped.length = 0
    for (const iter of iters) {
      const {done, value} = iter.next()
      if (done) {
        numberOfExausted++
      }
      zipped.push(done ? filler : value)
    }
    if (iters.length === numberOfExausted) {
      return
    }
    yield zipped
  }
}
