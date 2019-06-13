import { $async, $await } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'
import map from './$map'

$async; function * flatMap (func, iterable) {
  $await; for (const item of map(func, iterable)) {
    yield * item
  }
}

export default iterableCurry(flatMap)
