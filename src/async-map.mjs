import asyncBatch from './async-batch'

async function * map (concurrency, func, iterable) {
  let c = 0
  for await (const items of asyncBatch(concurrency, iterable)) {
    const results = await Promise.all(items.map((item) => func(item, c++)))
    yield * results
  }
}

export default function curriedMap (...args) {
  if (args.length === 1) {
    return iterable => map(1, args[0], iterable)
  } else if (args.length === 2 && typeof args[0] === 'number') {
    return iterable => map(args[0], args[1], iterable)
  } else if (args.length === 2) {
    return map(1, args[0], args[1])
  }
  return map(args[0], args[1], args[2])
}
