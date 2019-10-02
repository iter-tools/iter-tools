import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $every<T = any>(
  func: (item: T) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $every<T = any>(
  func: (item: T) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $every;
