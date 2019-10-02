import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $__method__<T = any>(
  iterable: $SourceIterable<T>,
): $Promise<T>;

export default $__method__;
