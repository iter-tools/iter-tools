/**
 * @generated-from ./$take-while.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from './internal/iterable'

function * takeWhile (func, i) {
  let take = true
  let c = 0

  for (const item of i) {
    take = func(item, c++)

    if (take) {
      yield item
    } else {
      break
    }
  }
}

export default iterableCurry(takeWhile)
