import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $lastOr<E, T = any>(
  whenEmpty: E,
  iterable: $SourceIterable<T>,
): $MaybePromise<T | E>;

export default $lastOr;
