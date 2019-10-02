import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $isSorted(iterable: $SourceIterable<any>): $MaybePromise<boolean>;

declare function $isSorted<T = any>(
  comparator: (a: T, b: T) => number,
  iterable: $SourceIterable<T>,
): $MaybePromise<boolean>;

export default $isSorted;
