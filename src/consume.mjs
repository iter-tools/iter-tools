import ensureIterable from './internal/ensure-iterable'

export default function consume (func, iterable) {
  if (!iterable) {
    return iterable => consume(func, iterable)
  }

  for (const item of ensureIterable(iterable)) {
    func(item)
  }
}
