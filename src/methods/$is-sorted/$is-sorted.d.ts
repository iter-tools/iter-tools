import { $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $isSorted(iterable: $InputIterable<any>): $MaybePromise<boolean>;

declare function $isSorted<T = any>(
  comparator: (a: T, b: T) => number,
  iterable: $InputIterable<T>,
): $MaybePromise<boolean>;

export default $isSorted;
