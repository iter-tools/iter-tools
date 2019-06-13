import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $flatMap<O, T = any>(
  func: (item: T) => $MaybePromise<$IterableLike<O>>,
): (iter: $IterableLike<T>) => $IterableIterator<O>;

declare function $flatMap<O, T = any>(
  func: (item: T) => $MaybePromise<$IterableLike<O>>,
  iter: $IterableLike<T>,
): $IterableIterator<O>;

export default $flatMap;
