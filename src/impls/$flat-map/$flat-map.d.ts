import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $flatMap<O, T>(
  func: (value: T, i: number) => $MaybePromise<$SourceIterable<O>>,
): (source: $SourceIterable<T>) => $ResultIterable<O>;

declare function $flatMap<O, T>(
  func: (value: T, i: number) => $MaybePromise<$SourceIterable<O>>,
  source: $SourceIterable<T>,
): $ResultIterable<O>;

export { $flatMap };
