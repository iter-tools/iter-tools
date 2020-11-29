import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $filter<T, S extends T>(
  predicate: (value: T, i: number) => value is S,
): (source: $SourceIterable<T>) => $ResultIterable<S>;

declare function $filter<T>(
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $filter<T, S extends T>(
  predicate: (value: T, i: number) => value is S,
  source: $SourceIterable<T>,
): $ResultIterable<S>;

declare function $filter<T>(
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $filter;
