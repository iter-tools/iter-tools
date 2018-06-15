import iter from './iter'

export default function consume (func, iterable) {
  if (!iterable) {
    return iterable => consume(func, iterable)
  }

  for (const item of iter(iterable)) {
    func(item)
  }
}
