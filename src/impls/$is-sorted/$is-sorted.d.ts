import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $isSorted(iterable: $Wrappable<any>): $Promise<boolean>;

declare function $isSorted<T>(
  compare: (a: T, b: T) => number,
  iterable: $Wrappable<T>,
): $Promise<boolean>;

export { $isSorted };
