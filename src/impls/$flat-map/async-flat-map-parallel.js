import { asyncMapParallel } from '../$map/async-map-parallel.js';
import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function* asyncFlatMapParallel(iterable, concurrency = 4, func) {
  for await (const value of asyncMapParallel(concurrency, func, iterable)) {
    yield* value;
  }
}

export default /*#__PURE__*/ asyncIterableCurry(asyncFlatMapParallel);
