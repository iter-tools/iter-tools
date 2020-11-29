import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $find<T, S extends T>(
  predicate: (value: T, i: number) => value is S,
): (iterable: $SourceIterable<T>) => $Promise<S | undefined>;

declare function $find<T>(
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<T | undefined>;

declare function $find<T, S extends T>(
  predicate: (value: T, i: number) => value is S,
  iterable: $SourceIterable<T>,
): $Promise<S | undefined>;

declare function $find<T>(
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<T | undefined>;

export default $find;
