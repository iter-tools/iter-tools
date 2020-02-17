import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $isSorted(iterable: $SourceIterable<any>): $MaybePromise<boolean>;

declare function $isSorted<T>(
  compareEquality: (a: T, b: T) => number,
  iterable: $SourceIterable<T>,
): $MaybePromise<boolean>;

export default $isSorted;
