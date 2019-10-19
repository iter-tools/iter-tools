import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $lastOr<E, T>(whenEmpty: E, iterable: $SourceIterable<T>): $MaybePromise<T | E>;

export default $lastOr;
