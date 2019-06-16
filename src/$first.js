import { $async, $await, $iteratorSymbol } from '../generate/async.macro'

import { $ensureIterable } from './internal/$iterable'

$async; function $first (iterable) {
  const iter = $ensureIterable(iterable)[$iteratorSymbol]()
  const { value, done } = $await(iter.next())

  if (done) return undefined

  if (typeof iter.return === 'function') $await(iter.return())

  return value
}

export default $first
