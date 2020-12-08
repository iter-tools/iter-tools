import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitGroupsBy<K, T>(
  key: (value: T, i: number) => $MaybePromise<K>,
): (source: $SourceIterable<T>) => $ResultIterable<[K, $ResultIterable<T>]>;

declare function $splitGroupsBy<K, T>(
  key: (value: T, i: number) => $MaybePromise<K>,
  source: $SourceIterable<T>,
): $ResultIterable<[K, $ResultIterable<T>]>;

export { $splitGroupsBy };
