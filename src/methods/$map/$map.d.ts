import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
): (iterable: $SourceIterable<T>) => $ResultIterable<O>;

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $ResultIterable<O>;

export default $map;
