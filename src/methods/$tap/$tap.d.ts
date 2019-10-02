import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
): (iterable: $SourceIterable<T>) => $ResultIterable<T>;

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
  iterable: $SourceIterable<T>,
): $ResultIterable<T>;

export default $tap;
