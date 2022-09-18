import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $max<T>(iterable: $Wrappable<T>): $Promise<T | undefined>;

declare function $max<T>(
  compare: (a: T, b: T) => number,
): (iterable: $Wrappable<T>) => $Promise<T | undefined>;

declare function $max<T>(
  compare: (a: T, b: T) => number,
  iterable: $Wrappable<T>,
): $Promise<T | undefined>;

export { $max };
