import {
  AsyncSourceIterable,
  AsyncResultIterable,
  AsyncMaybePromise,
} from '../../internal/async-iterable';

declare function asyncSplitWith<T = any>(
  predicate: (item: T, i: number) => AsyncMaybePromise<any>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<AsyncResultIterable<T>>;

declare function asyncSplitWith<T = any>(
  predicate: (item: T, i: number) => AsyncMaybePromise<any>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<AsyncResultIterable<T>>;

export default asyncSplitWith;
