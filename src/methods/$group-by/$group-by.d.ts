import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $groupBy(
  key: null | undefined,
): <T = any>(iterable: $SourceIterable<T>) => $ResultIterable<[T, $ResultIterable<T>]>;

declare function $groupBy<K, T = any>(
  key: (item: T) => $MaybePromise<K>,
): (iterable: $SourceIterable<T>) => $ResultIterable<[K, $ResultIterable<T>]>;

declare function $groupBy<T = any>(
  key: null | undefined,
  iterable: $SourceIterable<T>,
): $ResultIterable<[T, $ResultIterable<T>]>;

declare function $groupBy<K, T = any>(
  key: (item: T) => $MaybePromise<K>,
  iterable: $SourceIterable<T>,
): $ResultIterable<[K, $ResultIterable<T>]>;

export default $groupBy;
