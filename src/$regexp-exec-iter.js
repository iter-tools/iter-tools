import { $async, $await } from './macros/async.macro'

import { iterableCurry } from './internal/$iterable'
import regexExec from './regexp-exec'

$async; function * regexpExecIter (re, iterable) {
  let matches
  let buffer = ''
  $await; for (const chunk of iterable) {
    if (chunk === '') continue
    let lastIndex = 0
    matches = []
    buffer += chunk
    for (const match of regexExec(re, buffer)) {
      if (match[0] === '') {
        continue
      }
      lastIndex = re.lastIndex - match[0].length
      matches.push(match)
      if (matches.length === 2) {
        yield matches.shift()
      }
    }
    buffer = buffer.slice(lastIndex)
  }
  if (matches && matches.length) {
    yield * matches
  }
}

export default iterableCurry(regexpExecIter)
