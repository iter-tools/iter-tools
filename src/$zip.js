import { $isAsync, $async, $await, $iteratorSymbol } from '../generate/async.macro'

import { $ensureIterable } from './internal/$iterable'
import map from './map'

$async; function * $zip (...iterables) {
  const iters = iterables.map(arg => $ensureIterable(arg)[$iteratorSymbol]())
  const itersDone = iters.map(iter => ({ done: false, iter }))

  try {
    while (true) {
      const results = map(iter => iter.next(), iters)
      const syncResults = $isAsync ? $await(Promise.all(results)) : results

      const zipped = new Array(iters.length)

      let i = 0
      let allDone = true
      let done = false
      for (const result of syncResults) {
        allDone = allDone && result.done
        done = done || result.done
        itersDone[i].done = result.done
        zipped[i] = result.value
        i++
      }

      if (done) break
      yield zipped
      if (allDone) break
    }
  } finally {
    for (const { iter, done } of itersDone) {
      if (!done && typeof iter.return === 'function') $await(iter.return())
    }
  }
}

export default $zip
