import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
): (iterable: $IterableLike<T>) => $IterableIterator<T>;

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
  iterable: $IterableLike<T>,
): $IterableIterator<T>;

export default $tap;
