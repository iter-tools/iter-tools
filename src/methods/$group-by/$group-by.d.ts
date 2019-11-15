import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable, $ResultSubseqIterable } from '../../types/$iterable';
import { $EntryIterable } from '../../types/$entry-iterable';

declare function $groupBy<K, T>(
  key: (item: T) => $MaybePromise<K>,
): (source: $SourceIterable<T>) => $EntryIterable<K, $ResultSubseqIterable<T>>;

declare function $groupBy<K, T>(
  key: (item: T) => $MaybePromise<K>,
  source: $SourceIterable<T>,
): $EntryIterable<K, $ResultSubseqIterable<T>>;

export default $groupBy;
