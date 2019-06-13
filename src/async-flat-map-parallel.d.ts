import {
  AsyncIterableLike,
  AsyncIterableIterator,
  AsyncMaybePromise,
} from './internal/async-iterable';

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => AsyncMaybePromise<AsyncIterableLike<O>>,
): (iter: AsyncIterableLike<T>) => AsyncIterableIterator<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => AsyncMaybePromise<AsyncIterableLike<O>>,
): (iter: AsyncIterableLike<T>) => AsyncIterableIterator<O>;

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => AsyncMaybePromise<AsyncIterableLike<O>>,
  iter: AsyncIterableLike<T>,
): AsyncIterableIterator<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => AsyncMaybePromise<AsyncIterableLike<O>>,
  iter: AsyncIterableLike<T>,
): AsyncIterableIterator<O>;

export default asyncFlatMap;
