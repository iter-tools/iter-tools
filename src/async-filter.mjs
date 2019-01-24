import asyncBatch from './async-batch'
import zip from './zip'

async function * asyncFilter (concurrency, func, iterable) {
  let c = 0
  for await (const items of asyncBatch(concurrency, iterable)) {
    const filters = await Promise.all(items.map((item) => func(item, c++)))
    for (const [item, canYield] of zip(items, filters)) {
      if (canYield) yield item
    }
  }
}

export default function curriedAsyncFilter (...args) {
  if (args.length === 1) {
    return iterable => asyncFilter(1, args[0], iterable)
  } else if (args.length === 2 && typeof args[0] === 'number') {
    return iterable => asyncFilter(args[0], args[1], iterable)
  } else if (args.length === 2) {
    return asyncFilter(1, args[0], args[1])
  }
  return asyncFilter(args[0], args[1], args[2])
}
