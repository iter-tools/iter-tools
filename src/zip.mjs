import iter from './iter'

export default function * zip (...args) {
  const iters = args.map(x => iter(x))
  while (true) {
    const zipped = []
    for (const iter of iters) {
      const {done, value} = iter.next()
      if (done) return
      zipped.push(value)
    }
    yield zipped
  }
}
