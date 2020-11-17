import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $find<T, S extends T>(
  predicate: (item: T, i: number) => item is S,
): (iterable: $SourceIterable<T>) => $Promise<S | undefined>;

declare function $find<T>(
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<T | undefined>;

declare function $find<T, S extends T>(
  predicate: (item: T, i: number) => item is S,
  iterable: $SourceIterable<T>,
): $Promise<S | undefined>;

declare function $find<T>(
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<T | undefined>;

export default $find;
