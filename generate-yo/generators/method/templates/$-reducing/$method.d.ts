import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $__method__<T>(
  iterable: $SourceIterable<T>,
): $Promise<T>;

export default $__method__;
