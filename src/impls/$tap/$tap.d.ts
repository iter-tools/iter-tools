import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $tap<T>(
  callback: (value: T, i: number) => $MaybePromise<any>,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $tap<T>(
  callback: (value: T, i: number) => $MaybePromise<any>,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $tap;
