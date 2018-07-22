import ensureAsyncIterable from './internal/ensure-async-iterable'

export default async function size (iterable) {
  let size = 0
  // eslint-disable-next-line
  for await (const _ of ensureAsyncIterable(iterable)) {
    size++
  }
  return size
}
