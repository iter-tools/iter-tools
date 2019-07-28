import {
  AsyncInputIterable,
  AsyncGeneratorIterator,
  AsyncMaybePromise,
} from './internal/async-iterable';

declare function asyncFilterParallel<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<S>;

declare function asyncFilterParallel<S extends T, T = any>(
  concurrency: number,
  func: (item: T, i: number) => item is S,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<S>;

declare function asyncFilterParallel<T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<T>;

declare function asyncFilterParallel<T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<T>;

declare function asyncFilterParallel<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<S>;

declare function asyncFilterParallel<S extends T, T = any>(
  concurrency: number,
  func: (item: T, i: number) => item is S,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<S>;

declare function asyncFilterParallel<T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<T>;

declare function asyncFilterParallel<T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<T>;

export default asyncFilterParallel;
