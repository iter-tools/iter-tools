import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $takeWhile<T>(
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $takeWhile<T>(
  predicate: (value: T, i: number) => $MaybePromise<boolean>,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $takeWhile;
