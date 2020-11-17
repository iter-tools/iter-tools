import { asyncMapParallel } from '../$map/async-map-parallel.js';
import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function* asyncFlatMapParallel(iterable, concurrency = 4, func) {
  for await (const item of asyncMapParallel(concurrency, func, iterable)) {
    yield* item;
  }
}

export default /*#__PURE__*/ asyncIterableCurry(asyncFlatMapParallel);
