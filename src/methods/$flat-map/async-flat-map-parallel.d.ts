import {
  AsyncSourceIterable,
  AsyncResultIterable,
  AsyncMaybePromise,
} from '../../internal/async-iterable';

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => AsyncMaybePromise<AsyncSourceIterable<O>>,
): (iter: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => AsyncMaybePromise<AsyncSourceIterable<O>>,
): (iter: AsyncSourceIterable<T>) => AsyncResultIterable<O>;

declare function asyncFlatMap<O, T = any>(
  func: (item: T) => AsyncMaybePromise<AsyncSourceIterable<O>>,
  iter: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

declare function asyncFlatMap<O, T = any>(
  concurrency: number,
  func: (item: T) => AsyncMaybePromise<AsyncSourceIterable<O>>,
  iter: AsyncSourceIterable<T>,
): AsyncResultIterable<O>;

export default asyncFlatMap;
