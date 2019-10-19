import { AsyncSourceIterable, AsyncResultIterable, MaybePromise } from '../../types/async-iterable';

declare function asyncSplitWith<T>(
  predicate: (item: T, i: number) => MaybePromise<any>,
): (source: AsyncSourceIterable<T>) => AsyncResultIterable<AsyncResultIterable<T>>;

declare function asyncSplitWith<T>(
  predicate: (item: T, i: number) => MaybePromise<any>,
  source: AsyncSourceIterable<T>,
): AsyncResultIterable<AsyncResultIterable<T>>;

export default asyncSplitWith;
