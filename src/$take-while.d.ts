import { $InputIterable, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $takeWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $IterableIterator<T>;

declare function $takeWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $IterableIterator<T>;

export default $takeWhile;
