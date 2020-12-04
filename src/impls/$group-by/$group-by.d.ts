import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $groupBy<K, T>(
  key: (value: T, i: number) => $MaybePromise<K>,
): (source: $SourceIterable<T>) => $ResultIterable<[K, $ResultIterable<T>]>;

declare function $groupBy<K, T>(
  key: (value: T, i: number) => $MaybePromise<K>,
  source: $SourceIterable<T>,
): $ResultIterable<[K, $ResultIterable<T>]>;

export { $groupBy };
