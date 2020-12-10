import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $takeLast<T>(iterable: $Wrappable<T>): $Promise<T | undefined>;

export { $takeLast };
