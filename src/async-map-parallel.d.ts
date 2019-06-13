import {
  AsyncIterableLike,
  AsyncIterableIterator,
  AsyncMaybePromise,
} from './internal/async-iterable';

declare function asyncMapParallel<O, T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<O>,
): (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<O>;

declare function asyncMapParallel<O, T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<O>,
): (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<O>;

declare function asyncMapParallel<O, T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<O>,
  iterable: AsyncIterableLike<T>,
): AsyncIterableIterator<O>;

declare function asyncMapParallel<O, T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<O>,
  iterable: AsyncIterableLike<T>,
): AsyncIterableIterator<O>;

export default asyncMapParallel;
