import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $startsWithSubseq(
  valueSubseq: $SourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $startsWithSubseq(
  valueSubseq: $SourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

declare function $startsWithSubseq<V, T>(
  valueSubseq: $SourceIterable<V>,
  compare: (value: V, item: T) => boolean,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $startsWithSubseq<V, T>(
  valueSubseq: $SourceIterable<V>,
  compare: (value: V, item: T) => boolean,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $startsWithSubseq;
