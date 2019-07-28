import { $InputIterable, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $dropWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $IterableIterator<T>;

declare function $dropWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $IterableIterator<T>;

export default $dropWhile;
