import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $takeLastOr<E, T>(whenEmpty: E, iterable: $SourceIterable<T>): $Promise<T | E>;

export { $takeLastOr };
