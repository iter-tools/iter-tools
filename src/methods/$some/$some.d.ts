import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $some<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $Promise<boolean>;

declare function $some<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $Promise<boolean>;

export default $some;
