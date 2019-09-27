import { $InputIterable, $Promise, $MaybePromise } from '../../internal/$iterable';

declare function $find<S extends T, T = any>(
  predicate: (item: T, i: number) => item is S,
): (iterable: $InputIterable<T>) => $Promise<S | undefined>;

declare function $find<T = any>(
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $Promise<T | undefined>;

declare function $find<S extends T, T = any>(
  predicate: (item: T, i: number) => item is S,
  iterable: $InputIterable<T>,
): $Promise<S | undefined>;

declare function $find<T = any>(
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $Promise<T | undefined>;

export default $find;
