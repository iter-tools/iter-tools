import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $groupBy(
  key: null | undefined,
): <T = any>(iterable: $IterableLike<T>) => $IterableIterator<[T, $IterableIterator<T>]>;

declare function $groupBy<K, T = any>(
  key: (item: T) => $MaybePromise<K>,
): (iterable: $IterableLike<T>) => $IterableIterator<[K, $IterableIterator<T>]>;

declare function $groupBy<T = any>(
  key: null | undefined,
  iterable: $IterableLike<T>,
): $IterableIterator<[T, $IterableIterator<T>]>;

declare function $groupBy<K, T = any>(
  key: (item: T) => $MaybePromise<K>,
  iterable: $IterableLike<T>,
): $IterableIterator<[K, $IterableIterator<T>]>;

export default $groupBy;
