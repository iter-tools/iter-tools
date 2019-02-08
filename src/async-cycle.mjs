import { ensureAsyncIterable } from './internal/async-iterable'

export default async function * asyncCycle (iterable) {
  const copy = []
  for await (const item of ensureAsyncIterable(iterable)) {
    copy.push(item)
    yield item
  }
  yield * asyncCycle(copy)
}
