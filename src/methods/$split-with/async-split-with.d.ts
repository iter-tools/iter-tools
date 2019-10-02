import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncSplitWith<T = any>(
  predicate: (item: T, i: number) => MaybePromise<any>,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<AsyncResultIterable<T>>;

declare function asyncSplitWith<T = any>(
  predicate: (item: T, i: number) => MaybePromise<any>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<AsyncResultIterable<T>>;

export default asyncSplitWith;
