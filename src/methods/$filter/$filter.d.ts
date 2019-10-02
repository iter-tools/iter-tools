import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $filter<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: $SourceIterable<T>) => $ResultIterable<S>;

declare function $filter<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $ResultIterable<T>;

declare function $filter<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: $SourceIterable<T>,
): $ResultIterable<S>;

declare function $filter<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $ResultIterable<T>;

export default $filter;
