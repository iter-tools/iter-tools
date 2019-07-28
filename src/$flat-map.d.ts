import { $InputIterable, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $flatMap<O, T = any>(
  func: (item: T) => $MaybePromise<$InputIterable<O>>,
): (iter: $InputIterable<T>) => $IterableIterator<O>;

declare function $flatMap<O, T = any>(
  func: (item: T) => $MaybePromise<$InputIterable<O>>,
  iter: $InputIterable<T>,
): $IterableIterator<O>;

export default $flatMap;
