import { $isAsync, $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { map } from '../$map/map';

$async;
export function* $zipAll(iterables, { filler } = {}) {
  const iters = iterables.map(arg => arg[$iteratorSymbol]());
  const itersDone = iters.map(iter => ({ done: false, iter }));

  try {
    while (true) {
      const results = map(iters, iter => iter.next());
      const syncResults = $isAsync ? $await(Promise.all(results)) : results;

      const zipped = new Array(iters.length);

      let i = 0;
      let allDone = true;
      for (const { value, done } of syncResults) {
        allDone = allDone && done;
        itersDone[i].done = done;
        zipped[i] = done ? filler : value;
        i++;
      }

      if (allDone) break;
      yield zipped;
    }
  } finally {
    for (const { iter, done } of itersDone) {
      if (!done && typeof iter.return === 'function') $await(iter.return());
    }
  }
}

export default $iterableCurry($zipAll, {
  variadic: true,
  minArgs: 0,
  maxArgs: 1,
});
