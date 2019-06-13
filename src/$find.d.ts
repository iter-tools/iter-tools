import { $IterableLike, $Promise, $MaybePromise } from './internal/$iterable';

declare function $find<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: $IterableLike<T>) => $Promise<S | null>;

declare function $find<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $IterableLike<T>) => $Promise<T | null>;

declare function $find<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: $IterableLike<T>,
): $Promise<S | undefined>;

declare function $find<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $IterableLike<T>,
): $Promise<T | undefined>;

export default $find;
