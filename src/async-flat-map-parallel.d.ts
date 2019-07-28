import {
  AsyncInputIterable,
  AsyncIterableIterator,
  AsyncMaybePromise,
} from './internal/async-iterable';

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => AsyncMaybePromise<AsyncInputIterable<O>>,
): (iter: AsyncInputIterable<T>) => AsyncIterableIterator<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => AsyncMaybePromise<AsyncInputIterable<O>>,
): (iter: AsyncInputIterable<T>) => AsyncIterableIterator<O>;

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => AsyncMaybePromise<AsyncInputIterable<O>>,
  iter: AsyncInputIterable<T>,
): AsyncIterableIterator<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => AsyncMaybePromise<AsyncInputIterable<O>>,
  iter: AsyncInputIterable<T>,
): AsyncIterableIterator<O>;

export default asyncFlatMap;
