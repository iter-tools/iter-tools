import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitGroups<T>(
  source: $SourceIterable<T>,
): $ResultIterable<[T, $ResultIterable<T>]>;

declare function $splitGroups<K, T>(
  key: (value: T, i: number) => $MaybePromise<K>,
): (source: $SourceIterable<T>) => $ResultIterable<[K, $ResultIterable<T>]>;

declare function $splitGroups<K, T>(
  key: (value: T, i: number) => $MaybePromise<K>,
  source: $SourceIterable<T>,
): $ResultIterable<[K, $ResultIterable<T>]>;

export { $splitGroups };
