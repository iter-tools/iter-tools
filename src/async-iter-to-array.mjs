import asyncIter from './async-iter'

export default async function asyncIterToArray (iterable) {
  const out = []
  for await (const item of asyncIter(iterable)) {
    out.push(item)
  }
  return out
}
