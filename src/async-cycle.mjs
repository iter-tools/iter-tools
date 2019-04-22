import { ensureAsyncIterable } from './internal/async-iterable'

export default function asyncCycle (iterable) {
  return {
    async * [Symbol.asyncIterator] () {
      const copy = []
      for await (const item of ensureAsyncIterable(iterable)) {
        copy.push(item)
        yield item
      }
      yield * asyncCycle(copy)
    }
  }
}
