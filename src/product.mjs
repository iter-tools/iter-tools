import iter from './internal/iter'

export default function product (...args) {
  const iters = args.map(i => iter(i))

  function * multiply (iterable1, iterable2) {
    for (const item1 of iterable1) {
      for (const item2 of iterable2) {
        yield item1.concat(item2)
      }
    }
  }

  if (iters.length === 0) {
    return function * () {}
  } else {
    let currentIter = [[]]
    for (const it of iters) {
      currentIter = multiply(currentIter, Array.from(it))
    }
    return currentIter
  }
}
