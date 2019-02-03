import { ensureAsyncIterable } from './internal/async-iterable'

export default async function * cycle (iterable) {
  const copy = []
  for await (const item of ensureAsyncIterable(iterable)) {
    copy.push(item)
    yield item
  }
  yield * cycle(copy)
}
