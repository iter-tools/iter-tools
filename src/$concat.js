import { $async } from './macros/async.macro'

import { ensureIterable } from './internal/$iterable'

$async; function * concat (...arrayOfIter) {
  for (const iterable of arrayOfIter) {
    yield * ensureIterable(iterable)
  }
}

export default concat
