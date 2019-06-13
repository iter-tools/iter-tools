import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $dropWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $IterableLike<T>) => $IterableIterator<T>;

declare function $dropWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $IterableLike<T>,
): $IterableIterator<T>;

export default $dropWhile;
