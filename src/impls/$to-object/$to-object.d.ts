import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $toObject<V>(
  iterable: $Wrappable<[string, V]>,
  proto?: any,
): $Promise<{ [key: string]: V }>;

export { $toObject };
