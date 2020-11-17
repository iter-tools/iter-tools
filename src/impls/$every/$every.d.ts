import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $every<T>(
  predicate: (item: T) => $MaybePromise<boolean>,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $every<T>(
  predicate: (item: T) => $MaybePromise<boolean>,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $every;
