import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $every<T>(
  func: (item: T) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $every<T>(
  func: (item: T) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $every;
