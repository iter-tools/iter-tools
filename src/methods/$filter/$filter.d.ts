import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $filter<S extends T, T>(
  predicate: (item: T, i: number) => item is S,
): (source: $SourceIterable<T>) => $ResultIterable<S>;

declare function $filter<T>(
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $filter<S extends T, T>(
  predicate: (item: T, i: number) => item is S,
  source: $SourceIterable<T>,
): $ResultIterable<S>;

declare function $filter<T>(
  predicate: (item: T, i: number) => $MaybePromise<boolean>,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $filter;
