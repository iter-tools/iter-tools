import asyncIter from './internal/async-iter'

export default async function size (iterable) {
  let size = 0
  // eslint-disable-next-line
  for await (const _ of asyncIter(iterable)) {
    size++
  }
  return size
}
