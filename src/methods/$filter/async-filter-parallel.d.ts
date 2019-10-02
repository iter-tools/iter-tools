import {
  AsyncSourceIterable,
  AsyncResultIterable,
  AsyncMaybePromise,
} from '../../internal/async-iterable';

declare function asyncFilterParallel<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<S>;

declare function asyncFilterParallel<S extends T, T = any>(
  concurrency: number,
  func: (item: T, i: number) => item is S,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<S>;

declare function asyncFilterParallel<T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncFilterParallel<T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncFilterParallel<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<S>;

declare function asyncFilterParallel<S extends T, T = any>(
  concurrency: number,
  func: (item: T, i: number) => item is S,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<S>;

declare function asyncFilterParallel<T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

declare function asyncFilterParallel<T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<boolean>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

export default asyncFilterParallel;
