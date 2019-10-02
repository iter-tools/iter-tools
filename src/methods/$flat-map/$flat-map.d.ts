import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $flatMap<O, T = any>(
  func: (item: T) => $MaybePromise<$SourceIterable<O>>,
): (iter: $SourceIterable<T>) => $ResultIterable<O>;

declare function $flatMap<O, T = any>(
  func: (item: T) => $MaybePromise<$SourceIterable<O>>,
  iter: $SourceIterable<T>,
): $ResultIterable<O>;

export default $flatMap;
