import ensureIterable from './internal/ensure-iterable'

export default function * cycle (iterable) {
  let copy
  if (Array.isArray(iterable)) {
    while (true) {
      yield * iterable
    }
  } else {
    copy = []
    for (const item of ensureIterable(iterable)) {
      copy.push(item)
      yield item
    }
    yield * cycle(copy)
  }
}
