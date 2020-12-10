import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $takeLastOr<E, T>(whenEmpty: E, iterable: $Wrappable<T>): $Promise<T | E>;

export { $takeLastOr };
