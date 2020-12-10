import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $every<T>(
  predicate: (value: T) => $MaybePromise<boolean>,
): (iterable: $Wrappable<T>) => $Promise<boolean>;

declare function $every<T>(
  predicate: (value: T) => $MaybePromise<boolean>,
  iterable: $Wrappable<T>,
): $Promise<boolean>;

export { $every };
