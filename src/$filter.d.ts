import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $filter<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: $IterableLike<T>) => $IterableIterator<S>;

declare function $filter<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $IterableLike<T>) => $IterableIterator<T>;

declare function $filter<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: $IterableLike<T>,
): $IterableIterator<S>;

declare function $filter<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $IterableLike<T>,
): $IterableIterator<T>;

export default $filter;
