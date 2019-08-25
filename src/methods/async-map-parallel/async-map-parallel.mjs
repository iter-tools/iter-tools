import { asyncIterableCurry } from '../../internal/async-iterable';

import ParallelRunner from '../../internal/parallel-runner';

async function* asyncMapParallel(concurrency = 4, func, iterable) {
  let c = 0;

  yield* new ParallelRunner(iterable, async item => func(item, c++), concurrency);
}

export default asyncIterableCurry(asyncMapParallel, { minArgs: 1, maxArgs: 2 });
