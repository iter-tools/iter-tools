import {
  AsyncInputIterable,
  AsyncIterableIterator,
  AsyncMaybePromise,
} from './internal/async-iterable';

declare function asyncFilterParallel<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: AsyncInputIterable<T>) => AsyncIterableIterator<S>;

declare function asyncFilterParallel<S extends T, T = any>(
  concurrency: number,
  func: (item: T, i: number) => item is S,
): (iterable: AsyncInputIterable<T>) => AsyncIterableIterator<S>;

declare function asyncFilterParallel<T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
): (iterable: AsyncInputIterable<T>) => AsyncIterableIterator<T>;

declare function asyncFilterParallel<T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
): (iterable: AsyncInputIterable<T>) => AsyncIterableIterator<T>;

declare function asyncFilterParallel<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: AsyncInputIterable<T>,
): AsyncIterableIterator<S>;

declare function asyncFilterParallel<S extends T, T = any>(
  concurrency: number,
  func: (item: T, i: number) => item is S,
  iterable: AsyncInputIterable<T>,
): AsyncIterableIterator<S>;

declare function asyncFilterParallel<T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
  iterable: AsyncInputIterable<T>,
): AsyncIterableIterator<T>;

declare function asyncFilterParallel<T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
  iterable: AsyncInputIterable<T>,
): AsyncIterableIterator<T>;

export default asyncFilterParallel;
