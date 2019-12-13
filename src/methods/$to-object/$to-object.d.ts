import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $toObject<V>(
  source: $SourceIterable<[string, V]>,
): $MaybePromise<{ [key: string]: V }>;

export default $toObject;
