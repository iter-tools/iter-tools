import { $async, $await } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'

$async; function consume (func = () => {}, iterable) {
  let c = 0
  $await; for (const item of iterable) {
    $await(func(item, c++))
  }
}

export default iterableCurry(consume, { reduces: true, minArgs: 0, maxArgs: 1 })
