/**
 * @generated-from ./$group-by.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from './internal/iterable'
import splitBy from './internal/split-by'

function * cons (item, iterable) {
  yield item
  yield * iterable
}

function car (iterable) {
  const iterator = iterable[Symbol.iterator]()
  const {
    done,
    value
  } = iterator.next()
  if (done) return []
  return [value, iterator]
}

function * groupBy (getKey = k => k, iterable) {
  for (const subseq of splitBy(getKey, iterable)) {
    const [first, rest] = car(subseq)
    if (rest === undefined) return
    const key = getKey(first)
    yield [key, cons(first, rest)]
  }
}

export default iterableCurry(groupBy, {
  minArgs: 0,
  maxArgs: 1
})
