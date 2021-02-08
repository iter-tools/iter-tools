import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $__method__<T>(
  iterable: $Wrappable<T>,
): $Promise<T>;

export { $__method__ };
