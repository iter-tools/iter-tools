import map from './async-map'

async function * flatMap (func, iterable) {
  const mapIter = map(func)
  for await (const item of mapIter(iterable)) {
    yield * item
  }
}

export default function curriedFlatMap (func, iterable) {
  if (!iterable) {
    return iterable => flatMap(func, iterable)
  }
  return flatMap(func, iterable)
}
