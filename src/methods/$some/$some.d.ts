import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $some<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $some<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $some;
