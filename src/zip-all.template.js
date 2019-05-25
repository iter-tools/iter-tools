import { $isAsync, $async, $await, $iteratorSymbol } from './macros/async.macro'

import { ensureIterable } from './internal/$iterable'
import map from './map'

$async; function * zipAll (...iterables) {
  const iters = iterables.map(arg => ensureIterable(arg)[$iteratorSymbol]())
  const itersDone = iters.map(iter => ({ done: false, iter }))

  try {
    while (true) {
      const results = map(iter => iter.next(), iters)
      const syncResults = $isAsync ? $await(Promise.all(results)) : results

      const zipped = new Array(iters.length)

      let i = 0
      let allDone = true
      for (const { value, done } of syncResults) {
        allDone = allDone && done
        itersDone[i].done = done
        zipped[i] = done ? undefined : value
        i++
      }

      if (allDone) break
      yield zipped
    }
  } finally {
    for (const { iter, done } of itersDone) {
      if (!done && typeof iter.return === 'function') $await(iter.return())
    }
  }
}

export default zipAll
