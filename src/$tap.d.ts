import { $InputIterable, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
): (iterable: $InputIterable<T>) => $IterableIterator<T>;

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
  iterable: $InputIterable<T>,
): $IterableIterator<T>;

export default $tap;
