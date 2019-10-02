import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncMapParallel<O, T = any>(
  func: (item: T, i: number) => MaybePromise<O>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncMapParallel<O, T = any>(
  concurrency: number,
  func: (item: T, i: number) => MaybePromise<O>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncMapParallel<O, T = any>(
  func: (item: T, i: number) => MaybePromise<O>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

declare function asyncMapParallel<O, T = any>(
  concurrency: number,
  func: (item: T, i: number) => MaybePromise<O>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

export default asyncMapParallel;
