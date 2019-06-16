import { $async, $await } from '../generate/async.macro'

import { $iterableCurry } from './internal/$iterable'

$async; function * $interpose (interposeItem, iterable) {
  let first = true
  $await; for (const item of iterable) {
    if (!first) {
      yield interposeItem
    }
    yield item
    first = false
  }
}

export default $iterableCurry($interpose)
