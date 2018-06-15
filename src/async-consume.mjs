import asyncIter from './async-iter'

async function consume (func, iterable) {
  for await (const item of asyncIter(iterable)) {
    func(item)
  }
}

export default function curriedConsume (func, iterable) {
  if (!iterable) {
    return iterable => consume(func, iterable)
  }

  return consume(func, iterable)
}
