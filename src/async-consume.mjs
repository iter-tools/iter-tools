import asyncIter from './async-iter'

export default function consume (func, iterable) {
  async function curriedConsume (i) {
    for await (const item of asyncIter(i)) {
      func(item)
    }
  }
  if (iterable) {
    return curriedConsume(iterable)
  }
  return curriedConsume
}
