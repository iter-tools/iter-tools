import {
  AsyncSourceIterable,
  AsyncResultIterable,
  AsyncResultSubseqIterable,
  MaybePromise,
} from '../../types/async-iterable';

declare function asyncSplitWith<T>(
  predicate: (item: T, i: number) => MaybePromise<any>,
): (source: AsyncSourceIterable<T>) => AsyncResultIterable<AsyncResultSubseqIterable<T>>;

declare function asyncSplitWith<T>(
  predicate: (item: T, i: number) => MaybePromise<any>,
  source: AsyncSourceIterable<T>,
): AsyncResultIterable<AsyncResultSubseqIterable<T>>;

export default asyncSplitWith;
