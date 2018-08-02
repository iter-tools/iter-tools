import map from './map'

function * flatMap (func, iterable) {
  const mapIter = map(func)
  for (const item of mapIter(iterable)) {
    yield * item
  }
}

export default function curriedFlatMap (func, iterable) {
  if (arguments.length === 1) {
    return iterable => flatMap(func, iterable)
  }
  return flatMap(func, iterable)
}
