import { ensureIterable } from './internal/iterable'

export default function cycle (iterable) {
  return {
    * [Symbol.iterator] () {
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
  }
}
