import {
  AsyncInputIterable,
  AsyncGeneratorIterator,
  AsyncMaybePromise,
} from './internal/async-iterable';

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => AsyncMaybePromise<AsyncInputIterable<O>>,
): (iter: AsyncInputIterable<T>) => AsyncGeneratorIterator<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => AsyncMaybePromise<AsyncInputIterable<O>>,
): (iter: AsyncInputIterable<T>) => AsyncGeneratorIterator<O>;

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => AsyncMaybePromise<AsyncInputIterable<O>>,
  iter: AsyncInputIterable<T>,
): AsyncGeneratorIterator<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => AsyncMaybePromise<AsyncInputIterable<O>>,
  iter: AsyncInputIterable<T>,
): AsyncGeneratorIterator<O>;

export default asyncFlatMap;
