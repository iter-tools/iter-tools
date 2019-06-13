import { $async, $await } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'

$async; function * takeWhile (func, i) {
  let take = true
  let c = 0

  $await; for (const item of i) {
    take = $await(func(item, c++))
    if (take) {
      yield item
    } else {
      break
    }
  }
}

export default iterableCurry(takeWhile)
