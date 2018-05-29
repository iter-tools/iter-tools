import asyncIter from './async-iter'

export default async function * cycle (iterable) {
  const copy = []
  for await (const item of asyncIter(iterable)) {
    copy.push(item)
    yield item
  }
  yield * cycle(copy)
}
