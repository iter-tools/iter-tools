import { asyncIterableCurry } from '../../internal/async-iterable.js';

import { ParallelRunner } from '../../internal/parallel-runner.js';

export async function* __asyncMapParallel(iterable, func, concurrency = 4) {
  let c = 0;

  yield* new ParallelRunner(iterable, async (value) => func(value, c++), concurrency);
}

export const asyncMapParallel = /*#__PURE__*/ asyncIterableCurry(__asyncMapParallel, {
  minArgs: 1,
  maxArgs: 2,
});
