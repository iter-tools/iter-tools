import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $takeWhile<T>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $takeWhile<T>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $takeWhile;
