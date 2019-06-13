import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $takeSorted<T = any>(
  n: number,
): (iterable: $IterableLike<T>) => $IterableIterator<T>;

declare function $takeSorted<T = any>(
  func: (a: T, b: T) => number,
  n: number,
): (iterable: $IterableLike<T>) => $IterableIterator<T>;

declare function $takeSorted<T = any>(n: number, iterable: $IterableLike<T>): $IterableIterator<T>;

declare function $takeSorted<T = any>(
  func: (a: T, b: T) => number,
  n: number,
  iterable: $IterableLike<T>,
): $IterableIterator<T>;

export default $takeSorted;
