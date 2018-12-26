import ensureIterable from './internal/ensure-iterable'

function mapArray(func, arrayLike) {
  const out = new Array(arrayLike.length)
  for (let i = 0, len = arrayLike.length; i < len; i++) {
    out[i] = func(arrayLike[i], i)
  }
  return out
}

function * map (func, iterable) {
  if ('length' in iterable && iterable.length < 10000) {
    return mapArray(func, iterable)
  }
  let c = 0
  for (const item of ensureIterable(iterable)) {
    yield func(item, c++)
  }
}

export default function curriedMap (func, iterable) {
  if (arguments.length === 1) {
    return iterable => map(func, iterable)
  }
  return map(func, iterable)
}
