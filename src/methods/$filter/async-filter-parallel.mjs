import { asyncIterableCurry } from '../../internal/async-iterable';
import { ParallelRunner } from '../../internal/parallel-runner';

export async function* asyncFilterParallel(iterable, concurrency = 4, func) {
  let c = 0;

  const mapped = new ParallelRunner(
    iterable,
    async value => ({ value, result: await func(value, c++) }),
    concurrency,
  );

  for await (const { value, result } of mapped) {
    if (result) yield value;
  }
}

export default asyncIterableCurry(asyncFilterParallel, {
  minArgs: 1,
  maxArgs: 2,
});
