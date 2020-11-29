import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncMapParallel<O, T>(
  func: (value: T, i: number) => MaybePromise<O>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncMapParallel<O, T>(
  concurrency: number,
  func: (value: T, i: number) => MaybePromise<O>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncMapParallel<O, T>(
  func: (value: T, i: number) => MaybePromise<O>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

declare function asyncMapParallel<O, T>(
  concurrency: number,
  func: (value: T, i: number) => MaybePromise<O>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

export default asyncMapParallel;
