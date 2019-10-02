import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $takeWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $ResultIterable<T>;

declare function $takeWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $ResultIterable<T>;

export default $takeWhile;
