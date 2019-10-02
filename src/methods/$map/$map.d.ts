import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
): (source: $SourceIterable<T>) => $ResultIterable<O>;

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
  source: $SourceIterable<T>,
): $ResultIterable<O>;

export default $map;
