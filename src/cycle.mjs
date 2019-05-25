import { ensureIterable } from './internal/iterable'

export default function cycle (iterable) {
  return {
    * [Symbol.iterator] () {
      if (Array.isArray(iterable)) {
        while (true) {
          yield * iterable
        }
      } else {
        yield * cycle([...ensureIterable(iterable)])
      }
    }
  }
}
