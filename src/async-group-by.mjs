import { asyncIterableCurry } from './internal/async-iterable'
import asyncSplitBy from './internal/async-split-by'

async function * cons (item, iterable) {
  yield item
  yield * iterable
}

async function car (iterable) {
  const iterator = iterable[Symbol.asyncIterator]()
  const { done, value } = await iterator.next()
  if (done) return []
  return [value, iterator]
}

async function * asyncGroupBy (getKey = (k) => k, iterable) {
  for await (const subseq of asyncSplitBy(getKey, iterable)) {
    const [first, rest] = await car(subseq)
    if (rest === undefined) return
    const key = await getKey(first)
    yield [key, cons(first, rest)]
  }
}

export default asyncIterableCurry(asyncGroupBy, { variadic: false, minArgs: 0, maxArgs: 1 })
