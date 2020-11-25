import { asyncIterableCurry } from '../../internal/async-iterable';

import { ParallelRunner } from '../../internal/parallel-runner';

export async function* asyncMapParallel(iterable, concurrency = 4, func) {
  let c = 0;

  yield* new ParallelRunner(iterable, async (value) => func(value, c++), concurrency);
}

export default asyncIterableCurry(asyncMapParallel, { minArgs: 1, maxArgs: 2 });
