import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $flatMap<O, T>(
  func: (item: T) => $MaybePromise<$SourceIterable<O>>,
): (source: $SourceIterable<T>) => $ResultIterable<O>;

declare function $flatMap<O, T>(
  func: (item: T) => $MaybePromise<$SourceIterable<O>>,
  source: $SourceIterable<T>,
): $ResultIterable<O>;

export default $flatMap;
