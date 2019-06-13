import { $async, $await } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'

$async; function every (func, iterable) {
  let c = 0
  $await; for (const item of iterable) {
    if (!($await(func(item, c++)))) {
      return false
    }
  }
  return true
}

export default iterableCurry(every, { reduces: true })
