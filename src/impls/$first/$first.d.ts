import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $first<T>(iterable: $Wrappable<T>): $Promise<T | undefined>;

export { $first };
