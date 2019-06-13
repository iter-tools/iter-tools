import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
): (iterable: $IterableLike<T>) => $IterableIterator<O>;

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
  iterable: $IterableLike<T>,
): $IterableIterator<O>;

export default $map;
