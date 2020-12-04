import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $map<O, T>(
  func: (value: T, i: number) => $MaybePromise<O>,
): (source: $SourceIterable<T>) => $ResultIterable<O>;

declare function $map<O, T>(
  func: (value: T, i: number) => $MaybePromise<O>,
  source: $SourceIterable<T>,
): $ResultIterable<O>;

export { $map };
