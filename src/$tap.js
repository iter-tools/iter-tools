import { $async, $await } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'

$async; function * tap (func, iterable) {
  let c = 0
  $await; for (const item of iterable) {
    func(item, c++)
    yield item
  }
}

export default iterableCurry(tap)
