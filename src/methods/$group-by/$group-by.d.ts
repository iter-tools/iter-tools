import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $groupBy(
  key: null | undefined,
): <T>(source: $SourceIterable<T>) => $ResultIterable<[T, $ResultIterable<T>]>;

declare function $groupBy<K, T>(
  key: (item: T) => $MaybePromise<K>,
): (source: $SourceIterable<T>) => $ResultIterable<[K, $ResultIterable<T>]>;

declare function $groupBy<T>(
  key: null | undefined,
  source: $SourceIterable<T>,
): $ResultIterable<[T, $ResultIterable<T>]>;

declare function $groupBy<K, T>(
  key: (item: T) => $MaybePromise<K>,
  source: $SourceIterable<T>,
): $ResultIterable<[K, $ResultIterable<T>]>;

export default $groupBy;
