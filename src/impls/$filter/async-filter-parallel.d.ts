import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncFilterParallel<T, S extends T>(
  func: (value: T, i: number) => value is S,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<S>;

declare function asyncFilterParallel<T, S extends T>(
  concurrency: number,
  func: (value: T, i: number) => value is S,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<S>;

declare function asyncFilterParallel<T>(
  func: (value: T, i: number) => MaybePromise<boolean>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncFilterParallel<T>(
  concurrency: number,
  func: (value: T, i: number) => MaybePromise<boolean>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncFilterParallel<T, S extends T>(
  func: (value: T, i: number) => value is S,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<S>;

declare function asyncFilterParallel<T, S extends T>(
  concurrency: number,
  func: (value: T, i: number) => value is S,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<S>;

declare function asyncFilterParallel<T>(
  func: (value: T, i: number) => MaybePromise<boolean>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

declare function asyncFilterParallel<T>(
  concurrency: number,
  func: (value: T, i: number) => MaybePromise<boolean>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

export default asyncFilterParallel;
