import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $lastOr<E, T>(whenEmpty: E, iterable: $SourceIterable<T>): $Promise<T | E>;

export default $lastOr;
