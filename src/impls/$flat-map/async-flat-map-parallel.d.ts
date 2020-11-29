import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncFlatMap<O, T>(
  func: (value: T) => MaybePromise<AsyncSourceIterable<O>>,
): (iter: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T>(
  concurrency: number,
  func: (value: T) => MaybePromise<AsyncSourceIterable<O>>,
): (iter: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T>(
  func: (value: T) => MaybePromise<AsyncSourceIterable<O>>,
  iter: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

declare function asyncFlatMap<O, T>(
  concurrency: number,
  func: (value: T) => MaybePromise<AsyncSourceIterable<O>>,
  iter: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

export default asyncFlatMap;
