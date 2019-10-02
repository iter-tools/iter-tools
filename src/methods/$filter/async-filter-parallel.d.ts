import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncFilterParallel<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<S>;

declare function asyncFilterParallel<S extends T, T = any>(
  concurrency: number,
  func: (item: T, i: number) => item is S,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<S>;

declare function asyncFilterParallel<T = any>(
  func: (item: T, i: number) => MaybePromise<boolean>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncFilterParallel<T = any>(
  concurrency: number,
  func: (item: T, i: number) => MaybePromise<boolean>,
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
  func: (item: T, i: number) => MaybePromise<boolean>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

declare function asyncFilterParallel<T = any>(
  concurrency: number,
  func: (item: T, i: number) => MaybePromise<boolean>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

export default asyncFilterParallel;
