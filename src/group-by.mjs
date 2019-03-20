import { iterableCurry } from './internal/iterable'
import splitBy from './internal/split-by'

function * cons (item, iterable) {
  yield item
  yield * iterable
}

function car (iterable) {
  const iterator = iterable[Symbol.iterator]()
  const {done, value} = iterator.next()
  if (done) return []
  return [value, iterator]
}

function * groupBy (getKey = (k) => k, iterable) {
  for (const subseq of splitBy(getKey, iterable)) {
    const [first, rest] = car(subseq)
    if (rest === undefined) return
    const key = getKey(first)
    yield [key, cons(first, rest)]
  }
}

export default iterableCurry(groupBy, {variadic: false}, 0, 1)
