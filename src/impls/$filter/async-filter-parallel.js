import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { ParallelRunner } from '../../internal/parallel-runner.js';

export async function* __asyncFilterParallel(iterable, func, concurrency = 4) {
  let c = 0;

  const mapped = new ParallelRunner(
    iterable,
    async (value) => ({ value, result: await func(value, c++) }),
    concurrency,
  );

  for await (const { value, result } of mapped) {
    if (result) yield value;
  }
}

export const asyncFilterParallel = /*#__PURE__*/ asyncIterableCurry(__asyncFilterParallel, {
  minArgs: 1,
  maxArgs: 2,
});
