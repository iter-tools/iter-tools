import asyncToArray from './async-to-array'
import cycle from './cycle'

export default function asyncCycle (iterable) {
  return {
    async * [Symbol.asyncIterator] () {
      yield * cycle(await asyncToArray(iterable))
    }
  }
}
