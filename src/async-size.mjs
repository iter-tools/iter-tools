import { ensureAsyncIterable } from './internal/async-iterable'

export default async function asyncSize (iterable) {
  let size = 0
  // eslint-disable-next-line
  for await (const _ of ensureAsyncIterable(iterable)) {
    size++
  }
  return size
}
