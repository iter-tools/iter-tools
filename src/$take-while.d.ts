import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $takeWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $IterableLike<T>) => $IterableIterator<T>;

declare function $takeWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $IterableLike<T>,
): $IterableIterator<T>;

export default $takeWhile;
