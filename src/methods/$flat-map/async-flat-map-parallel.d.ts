import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncFlatMap<O, T>(
  func: (item: T) => MaybePromise<AsyncSourceIterable<O>>,
): (iter: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T>(
  concurrency: number,
  func: (item: T) => MaybePromise<AsyncSourceIterable<O>>,
): (iter: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T>(
  func: (item: T) => MaybePromise<AsyncSourceIterable<O>>,
  iter: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

declare function asyncFlatMap<O, T>(
  concurrency: number,
  func: (item: T) => MaybePromise<AsyncSourceIterable<O>>,
  iter: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

export default asyncFlatMap;
