import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $every<T = any>(
  func: (item: T) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $Promise<boolean>;

declare function $every<T = any>(
  func: (item: T) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $Promise<boolean>;

export default $every;
