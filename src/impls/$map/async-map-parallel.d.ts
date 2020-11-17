import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncMapParallel<O, T>(
  func: (item: T, i: number) => MaybePromise<O>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncMapParallel<O, T>(
  concurrency: number,
  func: (item: T, i: number) => MaybePromise<O>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncMapParallel<O, T>(
  func: (item: T, i: number) => MaybePromise<O>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

declare function asyncMapParallel<O, T>(
  concurrency: number,
  func: (item: T, i: number) => MaybePromise<O>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

export default asyncMapParallel;
