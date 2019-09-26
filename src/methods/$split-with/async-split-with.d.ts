import {
  AsyncInputIterable,
  AsyncGeneratorIterator,
  AsyncMaybePromise,
} from '../../internal/async-iterable';

declare function asyncSplitWith<T = any>(
  predicate: (item: T, i: number) => AsyncMaybePromise<any>,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<AsyncGeneratorIterator<T>>;

declare function asyncSplitWith<T = any>(
  predicate: (item: T, i: number) => AsyncMaybePromise<any>,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<AsyncGeneratorIterator<T>>;

export default asyncSplitWith;
