import { $InputIterable, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $takeSorted<T = any>(
  n: number,
): (iterable: $InputIterable<T>) => $IterableIterator<T>;

declare function $takeSorted<T = any>(
  func: (a: T, b: T) => number,
  n: number,
): (iterable: $InputIterable<T>) => $IterableIterator<T>;

declare function $takeSorted<T = any>(n: number, iterable: $InputIterable<T>): $IterableIterator<T>;

declare function $takeSorted<T = any>(
  func: (a: T, b: T) => number,
  n: number,
  iterable: $InputIterable<T>,
): $IterableIterator<T>;

export default $takeSorted;
