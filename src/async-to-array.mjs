import asyncIter from './internal/async-iter'

export default async function asyncToArray (iterable) {
  const out = []
  for await (const item of asyncIter(iterable)) {
    out.push(item)
  }
  return out
}
