import iter from './iter'

function reduce (func, iterable) {
  let c = 0
  let acc
  for (const item of iter(iterable)) {
    acc = func(acc, item, c++)
  }
  return acc
}

export default function curriedReduce (func, iterable) {
  if (!iterable) {
    return iterable => reduce(func, iterable)
  }
  return reduce(func, iterable)
}
