import { asyncIterableCurry } from '../../internal/async-iterable';
import ParallelRunner from '../../internal/parallel-runner';

export async function* asyncFilterParallel(iterable, concurrency = 4, func) {
  let c = 0;

  const mapped = new ParallelRunner(
    iterable,
    async item => ({ item, value: await func(item, c++) }),
    concurrency,
  );

  for await (const item of mapped) {
    if (item.value) {
      yield item.item;
    }
  }
}

export default asyncIterableCurry(asyncFilterParallel, {
  minArgs: 1,
  maxArgs: 2,
});
