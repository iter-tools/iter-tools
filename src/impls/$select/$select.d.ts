import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $select<T>(
  selector: (current: T, value: T) => boolean,
): (iterable: $Wrappable<T>) => $Promise<T | undefined>;

declare function $select<T>(
  selector: (current: T, value: T) => boolean,
  iterable: $Wrappable<T>,
): $Promise<T | undefined>;

export { $select };
