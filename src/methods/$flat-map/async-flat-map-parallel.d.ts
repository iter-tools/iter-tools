import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => MaybePromise<AsyncSourceIterable<O>>,
): (iter: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => MaybePromise<AsyncSourceIterable<O>>,
): (iter: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => MaybePromise<AsyncSourceIterable<O>>,
  iter: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => MaybePromise<AsyncSourceIterable<O>>,
  iter: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

export default asyncFlatMap;
