import { $InputIterable, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $filter<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: $InputIterable<T>) => $IterableIterator<S>;

declare function $filter<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $IterableIterator<T>;

declare function $filter<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: $InputIterable<T>,
): $IterableIterator<S>;

declare function $filter<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $IterableIterator<T>;

export default $filter;
