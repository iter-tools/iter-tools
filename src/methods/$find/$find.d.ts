import { $InputIterable, $Promise, $MaybePromise } from '../../internal/$iterable';

declare function $find<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: $InputIterable<T>) => $Promise<S | undefined>;

declare function $find<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $Promise<T | undefined>;

declare function $find<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: $InputIterable<T>,
): $Promise<S | undefined>;

declare function $find<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $Promise<T | undefined>;

declare function $find<NF, S extends T, T = any>(
  notFoundValue: NF,
  func: (item: T, i: number) => item is S,
): (iterable: $InputIterable<T>) => $Promise<S | NF>;

declare function $find<NF, T = any>(
  notFoundValue: NF,
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $Promise<T | NF>;

declare function $find<NF, S extends T, T = any>(
  notFoundValue: NF,
  func: (item: T, i: number) => item is S,
  iterable: $InputIterable<T>,
): $Promise<S | NF>;

declare function $find<NF, T = any>(
  notFoundValue: NF,
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $Promise<T | NF>;

export default $find;
