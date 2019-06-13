import { $async, $await } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'

$async; function find (func, iterable) {
  let c = 0
  $await; for (const item of iterable) {
    if ($await(func(item, c++))) {
      return item
    }
  }
  return undefined
}

export default iterableCurry(find, { reduces: true })
