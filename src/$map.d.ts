import { $InputIterable, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
): (iterable: $InputIterable<T>) => $IterableIterator<O>;

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
  iterable: $InputIterable<T>,
): $IterableIterator<O>;

export default $map;
