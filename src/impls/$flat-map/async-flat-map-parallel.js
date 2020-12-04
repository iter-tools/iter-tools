import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { __asyncMapParallel } from '../$map/async-map-parallel.js';

export async function* __asyncFlatMapParallel(iterable, func, concurrency = 4) {
  for await (const value of __asyncMapParallel(concurrency, func, iterable)) {
    yield* value;
  }
}

export const asyncFlatMapParallel = /*#__PURE__*/ asyncIterableCurry(__asyncFlatMapParallel, {
  minArgs: 1,
  maxArgs: 2,
});
